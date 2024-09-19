import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();

        // const { searchParams } = new URL(req.url);
        const searchParams = req.nextUrl.searchParams;

        const productId = searchParams.get('id');

        if (!productId) {
            return NextResponse.json({ message: 'Invalid or missing product ID' }, { status: 400 });
        }

        // Tìm sản phẩm theo ID
        const product = await Product.findById(productId);

        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        // Trả về thông tin sản phẩm
        return NextResponse.json({ product }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}






