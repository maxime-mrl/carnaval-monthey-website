import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route";
import { incorrectPasswordError, needLoginError } from "@utils/genericApiResponse";
import userModel, { deleteUserCheck } from "@models/user.model";
import handleError from "@utils/apiErrorHandler";
import { connectToDB } from "@utils/db";

export const POST = async (req:Request) => {
    try {
        // retrieve session
        const session = await getServerSession(authOptions);
        if (!session?.user ||  !("_id" in session.user)) return needLoginError();
        // user logged -> check password
        await connectToDB();
        const body = await req.json();
        const { password } = deleteUserCheck.parse(body);
        const user = await userModel.findById(session.user._id);
        if (!user || !(await bcrypt.compare(password, user.password))) return incorrectPasswordError();
        // user logged and password match -> proceed
        await userModel.findByIdAndDelete(session.user._id);
        return new Response(JSON.stringify({deleted: session.user._id}));
    } catch(err) {
        return handleError(err);
    }
}