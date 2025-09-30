/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { connectToDB } from "@/lib/dbConnect";
import { User } from "@/models/User";

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

// Validation helper
function validateLoginData(data: any) {
  const errors: string[] = [];

  if (!data.email) {
    errors.push("Email is required");
  } else if (typeof data.email !== "string") {
    errors.push("Email must be a string");
  } else if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) {
    errors.push("Invalid email format");
  }

  if (!data.password) {
    errors.push("Password is required");
  } else if (typeof data.password !== "string") {
    errors.push("Password must be a string");
  } else if (data.password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  return errors;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed. Only POST requests are accepted.",
    });
  }

  try {
    // Environment variables check
    if (!process.env.JWT_SECRET) {
      console.error("Missing JWT_SECRET environment variable");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    // Request body validation
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
      });
    }

    const { email, password } = req.body;

    // Validate input data
    const validationErrors = validateLoginData(req.body);
    if (validationErrors.length > 0) {
      console.error("Validation errors:", validationErrors);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Connect to database
    try {
      await connectToDB();
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }

    // Find user by email
    let user;
    try {
      user = await User.findOne({
        email: email.trim().toLowerCase(),
      }).select("+password");

      if (!user) {
        // Don't reveal whether email exists or not
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } catch (dbQueryError) {
      console.error("Database query error:", dbQueryError);
      return res.status(500).json({
        success: false,
        message: "Failed to authenticate user",
      });
    }

    // Check if user is active
    if (!user.isActive) {
      console.warn(`Inactive user attempted login: ${user.email}`);
      return res.status(403).json({
        success: false,
        message: "Account is deactivated. Please contact administrator.",
      });
    }

    // Verify password
    let isPasswordValid;
    try {
      isPasswordValid = await user.comparePassword(password);
    } catch (passwordError) {
      console.error("Password comparison error:", passwordError);
      return res.status(500).json({
        success: false,
        message: "Authentication error",
      });
    }

    if (!isPasswordValid) {
      console.warn(`Failed login attempt for email: ${email}`);
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Update last login timestamp
    try {
      user.lastLogin = new Date();
      await user.save();
    } catch (updateError) {
      console.error("Failed to update last login:", updateError);
      // Don't fail the login if this fails
    }

    // Generate JWT token
    const tokenPayload: JWTPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name,
    };

    let token;
    try {
      token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "8h", // 8 hours
      });
    } catch (jwtError) {
      console.error("JWT signing error:", jwtError);
      return res.status(500).json({
        success: false,
        message: "Failed to generate authentication token",
      });
    }

    // Set HTTP-only cookie
    res.setHeader(
      "Set-Cookie",
      serialize("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 8, // 8 hours
        path: "/",
        sameSite: "strict",
      })
    );

    console.log(`Successful login: ${user.email} (${user.role})`);

    // Return success response (without password)
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          lastLogin: user.lastLogin,
        },
        token, // Also return token for client-side storage if needed
      },
    });
  } catch (error: any) {
    console.error("Unexpected error in login handler:", error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during login",
      ...(process.env.NODE_ENV === "development" && {
        debug: error.message,
      }),
    });
  }
}
