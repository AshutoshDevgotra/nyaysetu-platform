import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    cookieStore.delete("auth-token");
    cookieStore.delete("user-role");

    return NextResponse.json(
        { message: "Logged out successfully" },
        { status: 200 }
    );
}
