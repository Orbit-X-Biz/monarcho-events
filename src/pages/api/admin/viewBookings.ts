/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDB } from "@/lib/dbConnect";
import { Booking } from "@/models/Booking";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Only GET requests are accepted.'
    });
  }

  try {
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

    // Extract pagination parameters with defaults
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));
    const skip = (page - 1) * limit;

    try {
      // Execute database queries in parallel for better performance
      const [bookings, totalCount] = await Promise.all([
        Booking.find({})
          .sort({ createdAt: -1 }) // Sort by creation date, newest first
          .skip(skip)
          .limit(limit)
          .lean(), // Use lean() for better performance
        Booking.countDocuments({})
      ]);

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      console.log(`Successfully retrieved ${bookings.length} bookings (page ${page}/${totalPages})`);

      // Transform the data for consistent response format
      const formattedBookings = bookings.map(booking => ({
        id: booking._id,
        name: booking.name,
        email: booking.email,
        contactNo: booking.contactNo,
        eventType: booking.eventType,
        dateOfEvent: booking.dateOfEvent,
        scenery: booking.scenery,
        noOfGuests: booking.noOfGuests,
        style: booking.style,
        services: booking.services,
        notes: booking.notes,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
        status: booking.status
      }));

      return res.status(200).json({
        success: true,
        message: `Retrieved ${bookings.length} bookings successfully`,
        data: {
          bookings: formattedBookings,
          pagination: {
            currentPage: page,
            totalPages,
            totalCount,
            limit,
            hasNextPage,
            hasPrevPage,
            nextPage: hasNextPage ? page + 1 : null,
            prevPage: hasPrevPage ? page - 1 : null
          }
        }
      });

    } catch (queryError: any) {
      console.error('Database query error:', queryError);

      // Handle specific MongoDB errors
      if (queryError.name === 'CastError') {
        return res.status(400).json({
          success: false,
          message: 'Invalid data format in database query'
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve bookings from database'
      });
    }

  } catch (error: any) {
    console.error('Unexpected error in get bookings handler:', error);

    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while retrieving bookings',
      ...(process.env.NODE_ENV === 'development' && {
        debug: error.message
      })
    });
  }
}