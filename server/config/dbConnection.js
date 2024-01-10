import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const connectionToDb = async() => {
   try {
     const { connection } = await mongoose.connect(process.env.MONGO_URI)
     if (connection) {
         console.log(`Connected to mongoDb ${connection.host}`);
     }
   } catch (error) {
    console.log("MongoDb connection failed", error);
    process.exit(1);
   }
}

export default connectionToDb;