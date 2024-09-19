import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true
        },
        role: {
            type: String,
            default: 'user'
        },
        password: String,
        name: String
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;