import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
});

const invoiceSchema = new Schema(
    {
        userId: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        orderInfo: { type: String, required: true },
        payType: { type: String, required: true },
        products: [productSchema],
    },
    {
        timestamps: true,
    }
);

const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);

export default Invoice;