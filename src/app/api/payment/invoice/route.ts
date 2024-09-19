import Invoice from "@/models/invoice";
import { NextRequest, NextResponse } from "next/server";

const createInvoice = async (req: NextRequest) => {
    try {
        const result = await req.json()
        const { extraData, amount, orderInfo, payType } = result;
        const decodedExtraData = Buffer.from(extraData, 'base64').toString('utf-8');
        const parsedData = JSON.parse(decodedExtraData);
        const { userId, products } = parsedData
        await Invoice.create({ userId, totalPrice: amount, orderInfo, payType, products });
        return NextResponse.json({ message: "Invoice created successfully." });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};

export const POST = createInvoice;