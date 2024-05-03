import mongoose from "mongoose";
import colors from "colors"
const connectDB =async()=>{
try {
    const connect = await mongoose.connect("mongodb+srv://ASP:ASP123@spyzy.cr7opeb.mongodb.net/user")
    console.log("connection stablished".bgMagenta.blue);
} catch (error) {
    console.log(`Momgodb error : ${error.massge}`)

}
}
export default connectDB;