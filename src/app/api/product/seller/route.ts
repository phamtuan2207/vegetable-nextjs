import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectMongoDB();
        const topSellingProducts = await Product.find()
            .sort({ quantitySold: -1 })
            .limit(8);

        // return NextResponse.json({ products: topSellingProducts });
        return new NextResponse(JSON.stringify({ products: topSellingProducts }), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000', // Cho phép localhost truy cập
                'Access-Control-Allow-Methods': 'GET,OPTIONS', // Các phương thức được phép
                'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Các header được phép
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}






