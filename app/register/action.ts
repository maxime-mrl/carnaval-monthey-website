"use server"
import bcrypt from "bcrypt";
import userModel, { registerUserCheck } from "@models/user.model";
import { connectToDB } from "@utils/db";

export default async function register(body:{ username: string, mail:string, password:string }) {
    try {
        const { username, mail, password } = registerUserCheck.parse(body);
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectToDB();
        await userModel.create({ username, mail, password: hashedPassword });
        return {
            success: true,
            error: null
        };
    } catch (err:any) {
        return {
            success: false,
            error: err.toString()
        };
    }
}