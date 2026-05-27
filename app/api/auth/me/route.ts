import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth-token")?.value;

        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 200 });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_key");
        const { payload } = await jwtVerify(token, secret);

        if (!payload || !payload.id) {
            return NextResponse.json({ authenticated: false }, { status: 200 });
        }

        await dbConnect();
        const user = await User.findById(payload.id).select("-password");

        if (!user) {
            return NextResponse.json({ authenticated: false }, { status: 200 });
        }

        return NextResponse.json({
            authenticated: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                barRegistrationNumber: user.barRegistrationNumber
            }
        });
    } catch (error) {
        console.error("Auth me check error:", error);
        return NextResponse.json({ authenticated: false }, { status: 200 });
    }
}
