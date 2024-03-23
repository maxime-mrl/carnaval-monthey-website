import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route";
import { needLoginError } from "@utils/genericApiResponse";
import userModel from "@models/user.model";
import handleError from "@utils/apiErrorHandler";
import { connectToDB } from "@utils/db";

export const GET = async (req:Request) => {
    try {
        console.log("ok")
        // retrieve session
        const session = await getServerSession(authOptions);
        if (!session?.user ||  !("_id" in session.user)) return needLoginError();
        // user logged -> proceed
        await connectToDB();
        const user = await userModel.findById(session.user._id);
        if (!user || !user.toObject()) throw new Error("Utilisateur introuvable!");
        const { password, __v, ...userWithoutPassword } = user.toObject(); // remove password and __v from returned object
        return new Response(JSON.stringify(userWithoutPassword));
    } catch(err) {
        return handleError(err);
    }
}