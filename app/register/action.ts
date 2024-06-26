"use server"
import bcrypt from "bcrypt";
import userModel, { registerUserCheck } from "@models/user.model";
import { connectToDB } from "@utils/db";
import parseErrors from "@utils/parseErrors";

// create user account
export default async function register(body:{ username: string, mail:string, password:string }) {
    try {
        // check inputs
        const { username, mail, password } = registerUserCheck.parse(body);
        // hash pass
        const hashedPassword = await bcrypt.hash(password, 10);
        // create in db
        await connectToDB();
        await userModel.create({ username, mail, password: hashedPassword });
        return {
            success: true,
            error: null
        };
    } catch (err:any) {
        return {
            success: false,
            error: parseErrors(err)
        };
    }
}