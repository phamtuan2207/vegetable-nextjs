import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, checkLogin } from "../auth";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ message: 'email and password are required' }, { status: 400 });
        }

        await connectMongoDB();

        const user = await User.findOne({ email, password });
        if (!user) {
            return NextResponse.json({ message: 'Incorrect email or password' }, { status: 401 });
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role, name: user.name }, '19120700')

        return NextResponse.json({ token }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

const getProfile = async (request: AuthenticatedRequest) => {
    const user = request.user;
    return NextResponse.json({ message: 'Protected data accessed', user }, { status: 200 });
};

export const GET = checkLogin(getProfile);