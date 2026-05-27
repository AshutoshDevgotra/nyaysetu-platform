import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { name, email, password, role, barRegistrationNumber, phone } = body;

        // Validate input
        if (!name || !email || !password || !role) {
            return NextResponse.json(
                { message: "Please provide all required fields." },
                { status: 400 }
            );
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "A user with this email already exists." },
                { status: 409 }
            );
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            barRegistrationNumber,
            phone,
        });

        return NextResponse.json(
            { message: "User registered successfully." },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "An error occurred during registration." },
            { status: 500 }
        );
    }
}
