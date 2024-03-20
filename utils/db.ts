import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    console.log("connecting to db...")
    mongoose.set('strictQuery', true);
    if (isConnected) return console.log('MongoDB is already connected');
    // no try / catch to be catched by the route.ts
    if (!process.env.MONGO_URI) throw new Error("Undefined MongoDB URI");
    await mongoose.connect(process.env.MONGO_URI, { dbName: "carnaval_monthey" });
    isConnected = true;
    console.log('MongoDB connected');
  }