import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    cookies().delete("user")

    return NextResponse.json({ message: "Remove Cookies" }, { status: 200 });
}