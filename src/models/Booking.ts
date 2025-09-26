import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Full name
    email: { type: String, required: true },
    contactNo: { type: String, required: true },

    eventType: { type: String, required: true }, // Wedding, Birthday etc.
    dateOfEvent: { type: Date, required: true },

    scenery: { type: String, required: true }, // Beachfront, Hilltop etc.
    noOfGuests: { type: String, required: true }, // e.g. "100 - 250 guests"

    style: { type: String }, // Boho, Exotic etc.
    services: [{ type: String }], // Array of Additional Services
    notes: { type: String }, // Optional free text

    dateOfCreation: { type: Date, default: Date.now }, // Auto set when created
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

export const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
