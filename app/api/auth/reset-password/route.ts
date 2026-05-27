import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
    try {
        await dbConnect();
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
        }

        // Reconstruct hashed token
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json({ message: "Invalid or expired reset token." }, { status: 400 });
        }

        // Set new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Clear reset fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return NextResponse.json({ message: "Password updated successfully." }, { status: 200 });
    } catch (error: any) {
        console.error("Reset password error:", error);
        return NextResponse.json({ message: "An error occurred." }, { status: 500 });
    }
}
