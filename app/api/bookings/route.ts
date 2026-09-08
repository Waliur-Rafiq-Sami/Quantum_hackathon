import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ServiceRequest from "@/models/ServiceRequest";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const {
      serviceName,
      customerName,
      contactPhone,
      location,
      date,
      timeSlot,
      urgency,
      problemDetails,
      images,
      provider,
    } = body;

    // Basic Validation
    if (!customerName || !contactPhone || !serviceName || !date || !timeSlot) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    // Save to Database
    const newBooking = await ServiceRequest.create({
      serviceName,
      customerName,
      contactPhone,
      location,
      date,
      timeSlot,
      urgency,
      problemDetails,
      images: images || [],
      provider,
      status: "Requested",
    });

    return NextResponse.json(
      { success: true, data: newBooking },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Failed to post booking:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server Error" },
      { status: 500 },
    );
  }
}
