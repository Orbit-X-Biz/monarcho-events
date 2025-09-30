import mongoose from "mongoose";

export async function connectToDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.log(`MONGODB_URI not provided`);
    throw new Error(`MONGODB_URI not defined`);
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 45000,
    });

    console.log(`MONGODB connection successful`);
  } catch (error) {
    console.log(`MONGODB connection error: ${error}`);
  }
}
