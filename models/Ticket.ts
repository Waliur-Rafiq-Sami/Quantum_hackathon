import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITicket extends Document {
  ticketId: string;
  title: string;
  category: string;
  userType: "Customer" | "Provider";
  userName: string;
  userEmail: string;
  userPhone: string;
  bookingId?: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Escalated" | "Resolved";
  assignedAdmin: string;
  description: string;
  createdAt: Date;
}

const TicketSchema: Schema = new Schema(
  {
    ticketId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    userType: { type: String, enum: ["Customer", "Provider"], required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPhone: { type: String, required: true },
    bookingId: { type: String },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Escalated", "Resolved"],
      default: "Open",
    },
    assignedAdmin: { type: String, default: "Unassigned" },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

const Ticket: Model<ITicket> =
  mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", TicketSchema);

export default Ticket;
