import bcrypt from "bcrypt";
import { NextApiRequest } from "next";
import userModel, { registerUserCheck } from "@models/user.model";

export const POST = async (req: NextApiRequest) => {
    try {
        const { username, mail, password } = registerUserCheck.parse(req.body) // need to parse with ZOD
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ username, mail, password: hashedPassword });
        return new Response(user);
    } catch (err) {
        return new Response("not ok")
    }
}