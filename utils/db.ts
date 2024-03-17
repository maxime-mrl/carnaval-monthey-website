import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) return console.log('MongoDB is already connected');
  
    try {
        if (!process.env.MONGODB_URI) throw new Error("Undefined MongoDB URI");
        await mongoose.connect(process.env.MONGODB_URI, { dbName: "carnaval_monthey" });
        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
    }
  }