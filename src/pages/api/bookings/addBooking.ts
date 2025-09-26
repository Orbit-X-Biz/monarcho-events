/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDB } from "@/lib/dbConnect";
import { Booking } from "@/models/Booking";
import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation helper function
function validateBookingData(data: any) {
  const requiredFields = ["name", "email", "contactNo", "eventType", "scenery"];
  const missingFields = [];
  const emptyFields = [];

  // Check for missing or null fields
  for (const field of requiredFields) {
    if (data[field] === null || data[field] === undefined) {
      missingFields.push(field);
    } else if (typeof data[field] === "string" && data[field].trim() === "") {
      emptyFields.push(field);
    }
  }

  // Email format validation
  if (data.email && typeof data.email === "string") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return { isValid: false, error: "Invalid email format" };
    }
  }

  // Phone number basic validation
  if (data.contactNo && typeof data.contactNo === "string") {
    const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
    if (!phoneRegex.test(data.contactNo.trim())) {
      return { isValid: false, error: "Invalid contact number format" };
    }
  }

  if (missingFields.length > 0) {
    return {
      isValid: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    };
  }

  if (emptyFields.length > 0) {
    return {
      isValid: false,
      error: `Empty required fields: ${emptyFields.join(", ")}`,
    };
  }

  return { isValid: true };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Method validation
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed. Only POST requests are accepted.",
    });
  }

  try {
    // Environment variables check
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    if (!process.env.FROM_DOMAIN) {
      console.error("Missing FROM_DOMAIN environment variable");
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

    // Extract and validate booking data
    const {
      name,
      email,
      contactNo,
      eventType,
      dateOfEvent,
      scenery,
      noOfGuests,
      style,
      services,
      notes,
    } = req.body;

    // Validate required fields
    const validation = validateBookingData(req.body);
    if (!validation.isValid) {
      console.error(`Validation error: ${validation.error}`);
      return res.status(400).json({
        success: false,
        message: validation.error,
      });
    }

    // Connect to database with error handling
    try {
      await connectToDB();
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }

    // Create and save booking
    let addedBooking;
    try {
      const newBooking = new Booking({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        contactNo: contactNo.trim(),
        eventType: eventType.trim(),
        dateOfEvent,
        scenery: scenery.trim(),
        noOfGuests,
        style: style?.trim(),
        services,
        notes: notes?.trim(),
      });

      addedBooking = await newBooking.save();
      console.log(`Booking successfully added with ID: ${addedBooking._id}`);
    } catch (dbSaveError: any) {
      console.error("Database save error:", dbSaveError);

      // Handle specific MongoDB errors
      if (dbSaveError.code === 11000) {
        return res.status(409).json({
          success: false,
          message: "A booking with this information already exists",
        });
      }

      if (dbSaveError.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          message: "Invalid booking data format",
          details: dbSaveError.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to save booking",
      });
    }

    // Send confirmation email
    try {
      const htmlMessage = `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #f9f9f9;">
          <img src="https://raw.githubusercontent.com/Orbit-X-Biz/Assets/main/Monarcho/Monarcho_logo.png" 
               alt="Monarch Events Logo" 
               width="120" 
               style="margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;" />

          <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #2C3E50;">Dear ${name.trim()},</h2>

            <p style="color:#926B48; font-size:16px;">
              Thank you for adding a booking with <strong>Monarcho Events</strong>. 
              We have received your request and our team will be contacting you soon to discuss the details.
            </p>

            <p style="margin-top: 20px; font-size: 16px; color:#2C3E50;">
              Warm regards,<br/>
              Monarcho Events Team
            </p>
          </div>
        </div>  
      `;

      const emailResult = await resend.emails.send({
        from: `Monarcho Events <${process.env.FROM_DOMAIN}>`,
        to: email.trim().toLowerCase(),
        subject: "Booking Confirmation - Monarcho Events",
        html: htmlMessage,
        text: `Dear ${name.trim()},\n\nThank you for adding a booking with Monarcho Events. We have received your request and will be contacting you soon to discuss the details.\n\nWarm regards,\nMonarcho Events Team`,
      });

      console.log(
        `Email sent successfully:`,
        emailResult.data?.id || "No ID returned"
      );

      // Check if email sending failed
      if (emailResult.error) {
        console.error("Email sending error:", emailResult.error);
        // Don't fail the entire request, just log the error
        // The booking was still saved successfully
      }
    } catch (emailError: any) {
      console.error("Email sending error:", emailError);

      // Email failure shouldn't fail the entire booking process
      // Log the error but continue with success response
      console.warn("Booking saved successfully but email notification failed");
    }

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Booking added successfully",
      data: {
        id: addedBooking._id,
        name: addedBooking.name,
        email: addedBooking.email,
        eventType: addedBooking.eventType,
        dateOfEvent: addedBooking.dateOfEvent,
      },
    });
  } catch (error: any) {
    console.error("Unexpected error in booking handler:", error);

    // Log the full error for debugging but don't expose sensitive details
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while processing your booking",
    });
  }
}
