import forumModel, { createPostCheck } from "@models/forum.model";
import checkSession from "@utils/api/checkSession";
import handleError from "@utils/api/errorHandler";
import { invalidDataError, needLoginError, serverError, unauthorizedError } from "@utils/api/genericResponse";
import { connectToDB } from "@utils/db";
import { isValidObjectId } from "mongoose";

// Get recent posts list
// GET /api/forum
// head: null -- body: null
export const GET = async () => {
    try {
        await connectToDB();
        const posts = await forumModel.find({ }).select(["-__v"]).limit(30);
        if (!posts || !Array.isArray(posts)) return serverError();
        return new Response(JSON.stringify(posts));
    } catch (err) {
        return handleError(err);
    }
}

// Post a forum message
// POST /api/forum
// head: session -- body: post { message }
export const POST = async (req: Request) => {
    try {
        // check session
        const userSession = await checkSession();
        if (!userSession) return needLoginError();
        // get the data
        const body = await req.json();
        const { message } = createPostCheck.parse(body);
        await connectToDB();
        const newPost = await forumModel.create({ message, author: userSession._id });
        if (!newPost) return serverError();
        // return the id if ok
        return new Response(JSON.stringify({
            created: newPost._id,
        }));
    } catch (err) {
        return handleError(err);
    }
}

// Delete a forum message
// POST /api/forum
// head: session -- body: postID { id }
export const DELETE = async (req: Request) => {
    try {
        // check session and right
        const userSession = await checkSession();
        if (!userSession) return needLoginError();
        // get the data
        const body = await req.json() as { id?: string } | null;
        if (!body || !body.id || !isValidObjectId(body.id)) return invalidDataError();
        const { id } = body;
        // try to delete
        await connectToDB();
        let deleted: null|Object = null
        if (userSession.right > 1) { // if user have moderation right delete no matter what
            deleted = await forumModel.findOneAndDelete({ id });
            if (!deleted || !("_id" in deleted)) throw new Error("Post non trouvé! merci de réessayer.");
        } else {  // if user don't have right check that he is the author
            const toDelete = await forumModel.findById(id);
            if (!toDelete || toDelete.author !== userSession._id) return unauthorizedError();
            deleted = await forumModel.findOneAndDelete({ id });
            if (!deleted || !("_id" in deleted)) throw new Error("Post non trouvé! merci de réessayer.");
        }
        // return the id if ok
        return new Response(JSON.stringify({
            deleted: deleted._id,
        }));
    } catch (err) {
        return handleError(err);
    }
}