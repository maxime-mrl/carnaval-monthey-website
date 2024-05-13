import eventsModel, { setEventsCheck } from "@models/events.model";
import checkSession from "@utils/api/checkSession";
import handleError from "@utils/api/errorHandler";
import { invalidDataError, needLoginError, serverError, unauthorizedError } from "@utils/api/genericResponse";
import { connectToDB } from "@utils/db";
import { isValidObjectId } from "mongoose";


// Add text element
// POST /api/evenets
// head: session -- body: events
export const POST = async (req: Request) => {
    try {
        // check session and right
        const userSession = await checkSession();
        if (!userSession) return needLoginError();
        if (userSession.right < 1) return unauthorizedError();
        // get the data
        const body = await req.json();
        const events = setEventsCheck.parse(body.events);
        // save to db
        await connectToDB();
        const eventsDb = await eventsModel.insertMany(events);
        if (!eventsDb) return serverError();
        // return the id if ok
        return new Response(JSON.stringify({
            status: "ok",
        }));
    } catch (err) {
        return handleError(err);
    }
}

// Remove text element
// DELETE /api/events
// head: session -- body: events id - { id }
export const DELETE = async (req: Request) => {
    try {
        // check session and right
        const userSession = await checkSession();
        if (!userSession) return needLoginError();
        if (userSession.right < 1) return unauthorizedError();
        // get the data
        const { id } = await req.json();
        if (!id || !isValidObjectId(id)) return invalidDataError();
        // try to delete
        await connectToDB();
        const deleted = await eventsModel.deleteOne({ _id : id });
        if (!deleted) throw new Error("evenement non trouvé! merci de réessayer.");
        // success
        return new Response(`Evenement ${id} supprimé avec succès.`);
    } catch (err) {
        return handleError(err);
    }
}

// Update events element
// POST /api/events
// head: session -- body: events - { identifier, text }
export const PUT = async (req:Request) => {
    try {
        // check session and right
        const userSession = await checkSession();
        if (!userSession) return needLoginError();
        if (userSession.right < 1) return unauthorizedError();
        // get the data
        const body = await req.json();
        const events = setEventsCheck.parse(body.events);
        // clear and save again the db
        await connectToDB();
        await eventsModel.deleteMany({ });
        const eventsDb = await eventsModel.insertMany(events);
        if (!eventsDb) return serverError();
        // return ok
        return new Response(JSON.stringify({
            status: "ok",
        }));
    } catch (err) {
        return handleError(err);
    }
}