import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(request: NextRequest) {
    try {
        const { email, name, password } = await request.json();
        if (!email || !name || !password) {
            return NextResponse.json({ message: 'email, name and password are required' }, { status: 400 });
        }

        await connectMongoDB();

        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
        }

        await User.create({ email, name, password });
        return NextResponse.json({ message: "User Created" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}