import textModel, { deleteTextCheck, setTextCheck } from "@models/text.model";
import checkSession from "@utils/api/checkSession";
import handleError from "@utils/api/errorHandler";
import { needLoginError, serverError, unauthorizedError } from "@utils/api/genericResponse";
import { connectToDB } from "@utils/db";


// Add text element
// POST /api/text/update
// head: session -- body: text - { identifier, text }
export const POST = async (req: Request) => {
    try {
        // check session and right
        const userSession = await checkSession();
        if (!userSession) return needLoginError();
        if (userSession.right < 1) return unauthorizedError();
        // get the data
        const body = await req.json();
        const { text, identifier } = setTextCheck.parse(body);
        // save to db
        await connectToDB();
        const textContent = await textModel.create({ text, identifier });
        if (!textContent) return serverError();
        // return the id if ok
        return new Response(JSON.stringify({
            created: textContent.identifier,
        }));
    } catch (err) {
        return handleError(err);
    }
}

// Remove text element
// DELETE /api/text/update
// head: session -- body: text id - { identifier }
export const DELETE = async (req: Request) => {
    try {
        // check session and right
        const userSession = await checkSession();
        if (!userSession) return needLoginError();
        if (userSession.right < 1) return unauthorizedError();
        // get the data
        const body = await req.json();
        const { identifier } = deleteTextCheck.parse(body);
        // try to delete
        await connectToDB();
        const deleted = await textModel.findOneAndDelete({ identifier });
        if (!deleted) throw new Error("Texte non trouvé! merci de réessayer.");
        // success
        return new Response(`Texte ${identifier} supprimé avec succès.`);

    } catch (err) {
        return handleError(err);
    }
}

// Update text element
// POST /api/text/update
// head: session -- body: text - { identifier, text }
export const PUT = async (req:Request) => {
    try {
        // check session and right
        const userSession = await checkSession();
        if (!userSession) return needLoginError();
        if (userSession.right < 1) return unauthorizedError();
        // get the data
        const body = await req.json();
        const { text, identifier } = setTextCheck.parse(body);
        // update the text
        const updatedUser = await textModel.findOneAndUpdate({ identifier }, { text }, { new: true });
        if (!updatedUser) throw new Error("Impossible de mettre à jour le texte, merci de réesseayer.");
        return new Response(`Texte mis à jour.`);
    } catch (err) {
        return handleError(err);
    }
}