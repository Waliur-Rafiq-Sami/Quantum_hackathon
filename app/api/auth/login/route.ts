import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    // 1. Basic validation
    if (!email || !password || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "Email, password, and account role are required.",
        },
        { status: 400 },
      );
    }

    // 2. Connect to MongoDB
    await connectDB();

    // 3. Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 },
      );
    }

    // 4. Verify account role match
    if (user.role !== role) {
      return NextResponse.json(
        {
          success: false,
          message: `This account is registered as a ${user.role.toUpperCase()}. Please switch to the ${
            user.role === "customer" ? "Customer" : "Service Provider"
          } tab above.`,
        },
        { status: 400 },
      );
    }

    // 5. Compare password hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 },
      );
    }

    // 6. Return user profile payload & mock access token
    const userPayload = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      location: user.location || null,
      businessName: user.businessName || null,
      expertiseCategory: user.expertiseCategory || null,
      isVerified: user.isVerified || false,
    };

    // Simulated auth token (You can swap with JWT or NextAuth if needed)
    const token = `token_${user._id}_${Date.now()}`;

    return NextResponse.json(
      {
        success: true,
        message: "Login successful!",
        token,
        user: userPayload,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error." },
      { status: 500 },
    );
  }
}
