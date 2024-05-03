import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        uniqe: true,
    },
    password: {
        require: true,
        type: String
    },
    phone: {
        type: String,
        require: true
    }

}, { timestamp: true })

export default mongoose.model("user",userSchema)