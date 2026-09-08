import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db/mongodb";
import { ProviderModel } from "@/models/Provider";

type MatchRequest = { category?: string; location?: string };
const demoProviders = [
  {
    id: "demo-1",
    name: "Amina Rahman",
    skills: ["plumbing", "electrical"],
    location: "Dhaka",
    rating: 4.9,
  },
  {
    id: "demo-2",
    name: "Rafi Ahmed",
    skills: ["cleaning", "delivery"],
    location: "Chattogram",
    rating: 4.8,
  },
];

export async function POST(request: Request) {
  let body: MatchRequest;
  try {
    body = (await request.json()) as MatchRequest;
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }
  if (!body.category || !body.location)
    return NextResponse.json(
      { error: "category and location are required." },
      { status: 400 },
    );

  const database = await connectToDatabase();
  if (!database) {
    const provider =
      demoProviders.find((item) =>
        item.skills.includes(body.category!.toLowerCase()),
      ) ?? demoProviders[0];
    return NextResponse.json({ provider, demo: true });
  }

  const provider = await ProviderModel.findOne({
    available: true,
    skills: body.category.toLowerCase(),
    location: new RegExp(body.location, "i"),
  })
    .sort({ rating: -1 })
    .lean();
  return NextResponse.json({ provider, demo: false });
}
