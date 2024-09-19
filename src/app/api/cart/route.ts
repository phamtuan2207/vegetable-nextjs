import { NextResponse } from "next/server";
import { AuthenticatedRequest, checkLogin } from "../auth/auth";
import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product";
import Cart from "@/models/cart";


const addToCart = async (request: AuthenticatedRequest) => {
    try {
        // Kết nối với MongoDB
        await connectMongoDB();

        // Lấy thông tin người dùng từ request sau khi checkLogin
        const user = request.user;

        // Kiểm tra nếu user không phải là string và có id
        if (typeof user !== 'string' && user && user.id) {
            const userId = user.id;

            // Parse request body để lấy thông tin sản phẩm
            const { productId } = await request.json();
            if (!productId) {
                return NextResponse.json({ message: 'Invalid or missing product ID' }, { status: 400 });
            }



            // Kiểm tra sản phẩm có tồn tại không
            const product = await Product.findById(productId);
            if (!product) {
                return NextResponse.json({ message: 'Product not found' }, { status: 404 });
            }

            // Kiểm tra xem giỏ hàng của người dùng đã có sản phẩm này chưa
            let cartItem = await Cart.findOne({ userId, productId });
            if (cartItem)
                return NextResponse.json({ message: 'Item  already exists', statusCode: 200 }, { status: 200 });
            cartItem = await Cart.create({ userId, productId })
            return NextResponse.json({ message: 'Item added to cart', cartItem, statusCode: 201 }, { status: 201 });
        } else {
            return NextResponse.json({ message: 'Invalid user information' }, { status: 401 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};

const getProductFromCart = async (request: AuthenticatedRequest) => {
    try {
        // Kết nối với MongoDB
        await connectMongoDB();

        // Lấy thông tin người dùng từ request sau khi checkLogin
        const user = request.user;

        // Kiểm tra nếu user không phải là string và có id
        if (typeof user !== 'string' && user && user.id) {
            const userId = user.id;
            const cartItems = await Cart.find({ userId })
            return NextResponse.json({ cartItems });
        } else {
            return NextResponse.json({ message: 'Invalid user information' }, { status: 401 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};

export const POST = checkLogin(addToCart);
export const GET = checkLogin(getProductFromCart)