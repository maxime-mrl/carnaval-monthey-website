import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route";
import { incorrectPasswordError, needLoginError } from "@utils/genericApiResponse";
import userModel, { deleteUserCheck, registerUserCheck } from "@models/user.model";
import handleError from "@utils/apiErrorHandler";
import { connectToDB } from "@utils/db";

// Get full self user infos
// GET /api/user/info
// head: session -- body: null 
export const GET = async () => {
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

// Create a new user account
// POST /api/user/register
// head: null -- body: user infos - username, mail, password
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

// Delete self user account
// DELETE /api/user/delete
// head: session -- body: user password - password
export const DELETE = async (req:Request) => {
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

// Update self user account
// PUT /api/user/delete
// head: session -- body: new user infos - ...
export const PUT = async (req:Request) => {
    return new Response("WIP")
}

// Update right of an user
// PATCH /api/user/delete
// head: session -- body: targeted user, right - id, right
export const PATCH = async (req:Request) => {
    return new Response("WIP")
}