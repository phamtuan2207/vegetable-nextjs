import mongoose, { Schema } from "mongoose";

const bannerSchema = new Schema(
    {
        image: String,
        title: String,
        name: String,
        color: String
    }
);

const Banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);

export default Banner;