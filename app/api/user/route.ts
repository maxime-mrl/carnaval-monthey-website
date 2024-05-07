import bcrypt from "bcrypt";
import { incorrectPasswordError, invalidDataError, needLoginError, unauthorizedError } from "@utils/api/genericResponse";
import userModel, { deleteUserCheck, registerUserCheck, updateUserCheck } from "@models/user.model";
import handleError from "@utils/api/errorHandler";
import { connectToDB } from "@utils/db";
import { isValidObjectId } from "mongoose";
import checkSession from "@utils/api/checkSession";

// Get full self user infos
// GET /api/user
// head: session -- body: null 
export const GET = async () => {
    try {
        // retrieve session
        const userSession = await checkSession();
        if (!userSession) return needLoginError();
        // return full session
        return new Response(JSON.stringify(userSession));
    } catch(err) {
        return handleError(err);
    }
}

// Create a new user account [NOT USED ANYMORE]
// POST /api/user
// head: null -- body: user infos - { username, mail, password }
export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { username, mail, password } = registerUserCheck.parse(body);
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectToDB();
        const user = await userModel.create({ username, mail, password: hashedPassword });
        return new Response(JSON.stringify({
            created: user._id,
        }));
    } catch (err) {
        return handleError(err);
    }
}

// Delete self user account
// DELETE /api/user
// head: session -- body: user password - { password }
export const DELETE = async (req:Request) => {
    try {
        // retrieve session
        const userSession = await checkSession(true);
        if (!userSession) return needLoginError();
        // user logged -> check password
        const body = await req.json();
        const { password } = deleteUserCheck.parse(body);
        if (!(await bcrypt.compare(password, userSession.password))) return incorrectPasswordError();
        // user logged and password match -> proceed
        await connectToDB();
        await userModel.findByIdAndDelete(userSession._id);
        return new Response(JSON.stringify({deleted: userSession._id}));
    } catch(err) {
        return handleError(err);
    }
}

// Update self user account
// PUT /api/user
// head: session -- body: new user infos and old password confirm - { checkPassword, password?, username?, mail?, }
export const PUT = async (req:Request) => {
    try {
        // retrieve session
        const userSession = await checkSession(true);
        if (!userSession) return needLoginError();
        // user logged -> check request and password
        const body = await req.json();
        const { checkPassword, ...toUpdate } = updateUserCheck.parse(body);
        if (!toUpdate.mail && !toUpdate.username && !toUpdate.password) return invalidDataError();
        if (!(await bcrypt.compare(checkPassword, userSession.password))) return incorrectPasswordError();
        // update user
        // check if passord encrypt it
        if (typeof toUpdate.password === "string") {
            toUpdate.password = await bcrypt.hash(toUpdate.password, 10);
        }
        const updatedUser = await userModel.findByIdAndUpdate(userSession._id, toUpdate, { new: true });
        if (!updatedUser) throw new Error("Impossible de mettre à jour votre compte, merci de réesseayer.");
        return new Response(`Compte mis à jour!`);
    } catch (err) {
        return handleError(err);
    }
}

// Update right of an user
// PATCH /api/user
// head: session -- body: targeted user, right - { target, right }
export const PATCH = async (req:Request) => {
    try {
        // retrieve session and check rights
        const userSesion = await checkSession();
        if (!userSesion) return needLoginError();
        if (userSesion.right < 2) return unauthorizedError();
        // check the request
        const body = await req.json();
        if (!body || !("right" in body) || !("target" in body) || isNaN(body.right)) return invalidDataError();
        // defines what is given to target the user (mail - id - username)
        let targetType:{ mail?:string, _id?:string, username?:string } = {};
        if (/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(body.target)) targetType.mail = body.target; // is a mail
        else if (isValidObjectId(body.target)) targetType._id = body.target; // is an object id
        else targetType.username = body.target; // is something else so we hope it's an username
        // search for user
        const user = await userModel.findOne(targetType);
        if (!user || !("_id" in user)) throw new Error("Compte introuvable");
        // update user
        const updatedUser = await userModel.findByIdAndUpdate(user._id, { right: body.right }, { new: true });
        if (!updatedUser) throw new Error("Impossible de mettre a jour l'utilisateur séléctionné.");
        return new Response(`Compte ${body.target} trouvé et mis à jour!`);
    } catch (err:any) {
        // add 404 to user not found error
        if (err && typeof err.message === "string" && /introuvable/.test(err.message)) err.status = 404;
        return handleError(err);
    } 
}