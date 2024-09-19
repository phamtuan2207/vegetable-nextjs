import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
import { checkAdmin } from "../auth/auth";


export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();
        // Lấy URL và các query parameters
        const { searchParams } = new URL(req.url);
        const productName = searchParams.get('productName') ? searchParams.get('productName') : ""
        const page = parseInt(searchParams.get('page') || '1');
        const limit = 4;

        let products = []
        if (productName) {
            products = await Product.find(
                productName ? { name: { $regex: productName, $options: 'i' } } : {}
            );
        }
        else {
            products = await Product.find();
        }
        if (products.length == 0)
            return NextResponse.json({ products, totalPages: 0 });
        else {
            const totalPages = Math.ceil(products.length / limit);
            const productsResponse = products.slice((page - 1) * limit, page * limit)
            return NextResponse.json({ products: productsResponse, totalPages });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}


export async function POST(request: NextRequest) {
    try {
        const { image, name, price, discountPercent, stock, category, quantitySold } = await request.json();
        if (!image || !name || !price || !stock || !category) {
            return NextResponse.json({ message: 'Image, name, price, stock and category are required' }, { status: 400 });
        }

        await connectMongoDB();
        const discountPercentValue = discountPercent ? discountPercent : 0
        const quantitySoldValue = quantitySold ? quantitySold : 0
        await Product.create({ image, name, price, stock, category, discountPercent: discountPercentValue, quantitySold: quantitySoldValue });
        return NextResponse.json({ message: "Product Created" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// const getAllProduct = async (request: NextRequest): Promise<NextResponse> => {
//     try {
// const { image, name, title, color } = await request.json();
// if (!image || !name || !title || !color) {
//     return NextResponse.json({ message: 'Image, name, title and color are required' }, { status: 400 });
// }

//         await connectMongoDB();
//         await Product.create({ image });

//         return NextResponse.json({ message: 'Product Created' }, { status: 201 });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//     }
// };

// Apply the middleware to the handler
// export const POST = checkAdmin(getAllProduct);


