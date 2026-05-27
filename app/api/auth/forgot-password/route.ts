import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: "Please provide an email address." }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            // Return 200 even if user not found to prevent email enumeration
            return NextResponse.json({ message: "If an account with that email exists, a password reset link has been sent." }, { status: 200 });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");

        // Hash token to save in DB
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // Set expiry to 30 mins
        const resetPasswordExpire = Date.now() + 30 * 60 * 1000;

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpire = resetPasswordExpire;
        await user.save({ validateBeforeSave: false });

        // Create Reset URL
        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;

        // Send Email via Resend
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "NyaySetu <no-reply@nyaysetu.in>",
            to: user.email,
            subject: "Password Reset Request - NyaySetu",
            html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>You are receiving this email because you (or someone else) have requested the reset of a password.</p>
          <p>Please click on the link below to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #ffcc99; color: #000; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>This link is valid for 30 minutes.</p>
        </div>
      `,
        });

        if (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });

            console.error("Resend error:", error);
            return NextResponse.json({ message: "Email could not be sent." }, { status: 500 });
        }

        return NextResponse.json({ message: "Password reset email sent." }, { status: 200 });
    } catch (error: any) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ message: "An error occurred." }, { status: 500 });
    }
}
