import connectMongoDB from "@/lib/mongodb";
import Banner from "@/models/banner";
import { NextRequest, NextResponse } from "next/server";
import { checkAdmin } from "../auth/auth";


export async function GET() {
    try {
        await connectMongoDB();
        const banners = await Banner.find();
        return NextResponse.json({ banners });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}


export async function POST(request: NextRequest) {
    try {
        const { image, name, title, color } = await request.json();
        if (!image || !name || !title || !color) {
            return NextResponse.json({ message: 'Image, name, title and color are required' }, { status: 400 });
        }

        await connectMongoDB();
        await Banner.create({ image, name, title, color });
        return NextResponse.json({ message: "Banner Created" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// const getAllBanner = async (request: NextRequest): Promise<NextResponse> => {
//     try {
// const { image, name, title, color } = await request.json();
// if (!image || !name || !title || !color) {
//     return NextResponse.json({ message: 'Image, name, title and color are required' }, { status: 400 });
// }

//         await connectMongoDB();
//         await Banner.create({ image });

//         return NextResponse.json({ message: 'Banner Created' }, { status: 201 });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//     }
// };

// Apply the middleware to the handler
// export const POST = checkAdmin(getAllBanner);


