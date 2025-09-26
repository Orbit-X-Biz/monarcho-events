import { connectToDB } from "@/lib/dbConnect";
import { Booking } from "@/models/Booking";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: `Method not allowed` });
  }

  try {
    const name = req.body.name;
    const email = req.body.email;
    const contactNo = req.body.contactNo;
    const eventType = req.body.eventType;
    const dateOfEvent = req.body.dateOfEvent;
    const scenery = req.body.scenery;
    const noOfGuests = req.body.noOfGuests;
    const style = req.body.style;
    const services = req.body.services;
    const notes = req.body.notes;

    if (
      name === null ||
      email === null ||
      contactNo === null ||
      eventType === null ||
      scenery === null
    ) {
      console.error(`Null value on the payload`);
      return res.status(400).json({ message: `Invalid payload - null values` });
    }

    if (
      name === "" ||
      contactNo === "" ||
      email === "" ||
      eventType === "" ||
      scenery === ""
    ) {
      console.error(`Empty values on the payload`);
      return res
        .status(400)
        .json({ message: `Invalid payload - empty values` });
    }

    await connectToDB()

    const newBooking = new Booking({
        name,
        email,
        contactNo,
        eventType,
        dateOfEvent,
        scenery,
        noOfGuests,
        style,
        services,
        notes
    })

    const addedBooking = await newBooking.save()
    console.log(`Booking added : ${addedBooking}`)

    //TODO - send email
    

    return res.status(200).json({message: `Booking added`, addedBooking})
  } catch (error) {
    console.error(`Error when adding the booking details ; ${error}`);
    res.status(500).json({ message: `Internal server error : ${error}` });
  }
}
