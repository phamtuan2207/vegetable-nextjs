import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        image: String,
        name: String,
        price: Number,
        discountPercent: {
            type: Number,
            default: 0
        },
        stock: Number,
        quantitySold: {
            type: Number,
            default: 0
        },
        category: String
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;