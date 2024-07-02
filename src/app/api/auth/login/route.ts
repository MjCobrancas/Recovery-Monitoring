import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const data = await request.json()

    cookies().set("user", JSON.stringify(data), {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 60 * 60 * 24 * 7, // one week
    })

    return NextResponse.json({ message: "Set Cookies" }, { status: 200 });
}
