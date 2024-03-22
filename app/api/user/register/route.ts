import bcrypt from "bcrypt";
import userModel, { registerUserCheck } from "@models/user.model";
import { connectToDB } from "@utils/db";
import handleError from "@utils/apiErrorHandler";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { username, mail, password } = registerUserCheck.parse(body);
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectToDB();
        const user = await userModel.create({ username, mail, password: hashedPassword });
        return new Response(JSON.stringify({
            mail: user.mail,
            username: user.username
        }));
    } catch (err) {
        return handleError(err);
    }
}