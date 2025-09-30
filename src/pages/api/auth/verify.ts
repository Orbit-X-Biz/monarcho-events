/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    // Get token from cookie or Authorization header
    const token =
      req.cookies.auth_token ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    return res.status(200).json({
      success: true,
      message: "Token is valid",
      data: {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        name: decoded.name,
      },
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}