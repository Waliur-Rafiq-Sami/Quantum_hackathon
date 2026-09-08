import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User"; // Replace with your User Mongoose Model or ORM entity
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Common fields
    const role = formData.get("role") as string; // 'customer' | 'provider'
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;

    // 1. Validation for common fields
    if (!role || !fullName || !email || !password || !phone) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    // 2. Connect to Database
    await connectDB();

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists.",
        },
        { status: 400 },
      );
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Construct payload based on role
    let userData: any = {
      fullName,
      email,
      phone,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    };

    if (role === "customer") {
      const location = formData.get("location") as string;
      userData.location = location;
    } else if (role === "provider") {
      const businessName = formData.get("businessName") as string;
      const expertiseCategory = formData.get("expertiseCategory") as string;
      const baseCharge = formData.get("baseCharge") as string;
      const documentFile = formData.get("document") as File | null;

      // Handle document upload if present (save to S3/Cloudinary or DB reference)
      let documentUrl = null;
      if (documentFile && documentFile.size > 0) {
        // Example: Upload file or save reference
        documentUrl = `/uploads/${documentFile.name}`;
      }

      userData = {
        ...userData,
        businessName,
        expertiseCategory,
        baseCharge: Number(baseCharge) || 0,
        verificationDocument: documentUrl,
        isVerified: false, // Pending background check for providers
      };
    }

    // 6. Save User in Database
    const newUser = await User.create(userData);

    return NextResponse.json(
      {
        success: true,
        message:
          role === "customer"
            ? "Account created successfully!"
            : "Provider application submitted successfully! Pending verification.",
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Signup API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error." },
      { status: 500 },
    );
  }
}
