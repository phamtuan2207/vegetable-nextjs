import connectMongoDB from "@/lib/mongodb";
import { AuthenticatedRequest, checkLogin } from "../../auth/auth";
import { NextResponse } from "next/server";
import Cart from "@/models/cart";

const getCartByUserId = async (request: AuthenticatedRequest) => {
    try {
        // Kết nối với MongoDB
        await connectMongoDB();

        // Lấy thông tin người dùng từ request sau khi checkLogin
        const user = request.user;

        // Kiểm tra nếu user không phải là string và có id
        if (typeof user !== 'string' && user && user.id) {
            const userId = user.id;
            const cartItems = await Cart.find({ userId }).populate('productId');
            return NextResponse.json({ cartItems });
        } else {
            return NextResponse.json({ message: 'Invalid user information' }, { status: 401 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};

const deleteCartItem = async (request: AuthenticatedRequest) => {
    try {
        await connectMongoDB();

        const user = request.user;

        if (typeof user !== 'string' && user && user.id) {
            const { cartId } = await request.json();

            if (!cartId) {
                return NextResponse.json({ message: 'Invalid or missing cart ID' }, { status: 400 });
            }

            const cartItem = await Cart.findOne({ _id: cartId, userId: user.id });

            if (!cartItem) {
                return NextResponse.json({ message: 'Cart item not found or does not belong to the user' }, { status: 404 });
            }

            await Cart.deleteOne({ _id: cartId });

            return NextResponse.json({ message: 'Cart item deleted successfully' }, { status: 200 });

        } else {
            return NextResponse.json({ message: 'Invalid user information' }, { status: 401 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};

export const GET = checkLogin(getCartByUserId)
export const DELETE = checkLogin(deleteCartItem)
