import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Please provide email and password" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Create JWT token using jose
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_key");
        const token = await new SignJWT({ id: user._id, role: user.role })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(secret);

        // Create response and set cookies
        const response = NextResponse.json(
            { message: "Logged in successfully", user: { name: user.name, email: user.email, role: user.role } },
            { status: 200 }
        );

        // Set auth token cookie
        response.cookies.set({
            name: "auth-token",
            value: token,
            httpOnly: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7 days
            sameSite: "lax",
        });

        // Set role cookie for middleware routing
        response.cookies.set({
            name: "user-role",
            value: user.role,
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7 days
            sameSite: "lax",
        });

        return response;
    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "An error occurred during login." },
            { status: 500 }
        );
    }
}
