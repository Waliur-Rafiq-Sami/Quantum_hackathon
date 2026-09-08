import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Ticket from "@/models/Ticket";

// GET /api/tickets - Fetch all tickets
export async function GET() {
  try {
    await connectDB();
    const tickets = await Ticket.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: tickets }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// POST /api/tickets - Create a new ticket
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const newTicket = await Ticket.create(body);
    return NextResponse.json(
      { success: true, data: newTicket },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
