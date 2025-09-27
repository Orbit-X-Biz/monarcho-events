/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDB } from "@/lib/dbConnect";
import { Booking } from "@/models/Booking";
import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import mongoose from "mongoose";

const resend = new Resend(process.env.RESEND_API_KEY);

// Valid status values
const VALID_STATUSES = ["DONE", "ONGOING"] as const;
type BookingStatus = typeof VALID_STATUSES[number];

// Validation helper function
function validateUpdateData(data: any) {
  const errors: string[] = [];

  // Check if booking ID is provided
  if (!data.id) {
    errors.push('Booking ID is required');
  } else if (!mongoose.Types.ObjectId.isValid(data.id)) {
    errors.push('Invalid booking ID format');
  }

  // Check if status is provided and valid
  if (!data.status) {
    errors.push('Status is required');
  } else if (!VALID_STATUSES.includes(data.status.toUpperCase())) {
    errors.push(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  return errors;
}

// Email template for completion
function getCompletionEmailTemplate(name: string, eventType: string) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #f9f9f9;">
      <img src="https://raw.githubusercontent.com/Orbit-X-Biz/Assets/main/Monarcho/Monarcho_logo.png" 
           alt="Monarcho Events Logo" 
           width="120" 
           style="margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;" />

      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #2C3E50; margin-bottom: 20px;">Dear ${name},</h2>

        <p style="color: #926B48; font-size: 18px; margin-bottom: 20px;">
          🎉 <strong>Congratulations!</strong> Your ${eventType.toLowerCase()} event has been successfully completed!
        </p>

        <p style="color: #2C3E50; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Thank you for choosing <strong>Monarcho Events</strong> to make your special day unforgettable. 
          It was our absolute pleasure to be part of your celebration and bring your vision to life.
        </p>

        <p style="color: #2C3E50; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          We hope your event exceeded all expectations and created beautiful memories that will last a lifetime. 
          Your trust in our team means the world to us.
        </p>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <p style="color: #926B48; font-size: 16px; margin: 0;">
            💫 We would love to be part of your future celebrations too! 
            Whether it's another milestone or helping friends and family with their events, 
            Monarcho Events is always here to create magic.
          </p>
        </div>

        <p style="color: #2C3E50; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
          If you have a moment, we would greatly appreciate your feedback or a review. 
          Your testimonial helps us serve future clients even better.
        </p>

        <p style="margin-top: 30px; font-size: 16px; color: #2C3E50;">
          With warmest regards and gratitude,<br/>
          <strong style="color: #926B48;">The Monarcho Events Team</strong>
        </p>

        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">
            Follow us for more event inspiration and stay connected for future celebrations!
          </p>
        </div>
      </div>
    </div>
  `;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow PUT/PATCH requests
  if (!["PUT", "PATCH"].includes(req.method || "")) {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Only PUT/PATCH requests are accepted.'
    });
  }

  try {
    // Environment variables check
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error'
      });
    }

    if (!process.env.FROM_DOMAIN) {
      console.error('Missing FROM_DOMAIN environment variable');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error'
      });
    }

    // Request body validation
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body'
      });
    }

    // Extract and validate update data
    const { id, status } = req.body;

    // Validate required fields
    const validationErrors = validateUpdateData(req.body);
    if (validationErrors.length > 0) {
      console.error(`Validation error:`, validationErrors);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    // Connect to database
    try {
      await connectToDB();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return res.status(500).json({
        success: false,
        message: 'Database connection failed'
      });
    }

    // Normalize status to uppercase
    const normalizedStatus = status.toUpperCase() as BookingStatus;

    try {
      // Find and update the booking
      const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        { 
          status: normalizedStatus,
          updatedAt: new Date()
        },
        { 
          new: true, // Return updated document
          runValidators: true // Run schema validation
        }
      );

      if (!updatedBooking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      console.log(`Booking ${id} status updated to ${normalizedStatus}`);

      // Send completion email if status is DONE
      if (normalizedStatus === "DONE") {
        try {
          const htmlMessage = getCompletionEmailTemplate(
            updatedBooking.name,
            updatedBooking.eventType
          );

          const textMessage = `Dear ${updatedBooking.name},

Congratulations! Your ${updatedBooking.eventType.toLowerCase()} event has been successfully completed!

Thank you for choosing Monarcho Events to make your special day unforgettable. It was our absolute pleasure to be part of your celebration and bring your vision to life.

We hope your event exceeded all expectations and created beautiful memories that will last a lifetime. Your trust in our team means the world to us.

We would love to be part of your future celebrations too! Whether it's another milestone or helping friends and family with their events, Monarcho Events is always here to create magic.

If you have a moment, we would greatly appreciate your feedback or a review. Your testimonial helps us serve future clients even better.

With warmest regards and gratitude,
The Monarcho Events Team`;

          const emailResult = await resend.emails.send({
            from: `Monarcho Events <${process.env.FROM_DOMAIN}>`,
            to: updatedBooking.email,
            subject: `Thank You for Choosing Monarcho Events - ${updatedBooking.eventType} Completed! 🎉`,
            html: htmlMessage,
            text: textMessage,
          });

          if (emailResult.error) {
            console.error('Email sending error:', emailResult.error);
          } else {
            console.log(`Completion email sent successfully to ${updatedBooking.email}:`, emailResult.data?.id || 'No ID returned');
          }

        } catch (emailError: any) {
          console.error('Email sending error:', emailError);
          // Don't fail the update if email fails
          console.warn('Booking updated successfully but completion email failed');
        }
      }

      // Return success response
      return res.status(200).json({
        success: true,
        message: `Booking status updated to ${normalizedStatus}${normalizedStatus === 'DONE' ? ' and completion email sent' : ''}`,
        data: {
          id: updatedBooking._id,
          name: updatedBooking.name,
          email: updatedBooking.email,
          eventType: updatedBooking.eventType,
          status: updatedBooking.status,
          dateOfEvent: updatedBooking.dateOfEvent,
          updatedAt: updatedBooking.updatedAt
        }
      });

    } catch (dbUpdateError: any) {
      console.error('Database update error:', dbUpdateError);

      // Handle specific MongoDB errors
      if (dbUpdateError.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Invalid booking data',
          details: dbUpdateError.message
        });
      }

      if (dbUpdateError.name === 'CastError') {
        return res.status(400).json({
          success: false,
          message: 'Invalid booking ID format'
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Failed to update booking'
      });
    }

  } catch (error: any) {
    console.error('Unexpected error in update booking handler:', error);

    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while updating the booking',
    });
  }
}