import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, (err) => {
    err
        ? console.log("Ha ocurrido un error al intentar conectar con mongoDB")
        : console.log("Conectado a MongoDB")
})

export default mongoose;