import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, (err) => {
    err
        ? console.log("error al contectarse con mongoDB")
        : console.log("Coneccion con mongoDB correcta")
})

export default mongoose;