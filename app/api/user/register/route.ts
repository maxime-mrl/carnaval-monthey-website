import bcrypt from "bcrypt";
import userModel, { registerUserCheck } from "@models/user.model";
import { connectToDB } from "@utils/db";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { username, mail, password } = registerUserCheck.parse(body);
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectToDB();
        const user = await userModel.create({ username, mail, password: hashedPassword });
        return new Response(user);
    } catch (err:any) {
        if (/E11000/.test(err)) return new Response("Ce compte existe déjà!");
        if (err.errors && err.errors[0].message) return new Response(err.errors[0].message);
        return new Response(err.toString());
    }
}