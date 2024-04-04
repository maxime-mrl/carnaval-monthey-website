import fs from "fs";
import sharp from "sharp";
import { connectToDB } from "@utils/db";
import sponsorModel from "@models/sponsor.model";
import handleError from "@utils/api/errorHandler";
import checkSession from "@utils/api/checkSession";
import { invalidDataError, needLoginError, serverError, unauthorizedError } from "@utils/api/genericResponse";
import { isValidObjectId } from "mongoose";

const sponsorDir = "public/sponsor";

// Get sponsors list
// GET /api/sponsor
// head: null -- body: null
export const GET = async () => {
    try {
        await connectToDB();
        const sponsors = await sponsorModel.find({ }).select(["-__v"]);
        if (!sponsors || sponsors.length < 1) return serverError();
        return new Response(JSON.stringify([
            ...sponsors
        ]));
    } catch (err) {
        return handleError(err);
    }
}

// Add a sponsor
// POST /api/sponsor
// head: session -- body: sponsor - { name, image }
export const POST = async (req: Request) => {
    try {
        // check session and right
        const userSession = await checkSession();
        if (!userSession) return needLoginError();
        if (userSession.right < 1) return unauthorizedError();
        // get the form data
        const body = await req.formData();
        const name = body.get("name");
        const image = body.get("image");
        // basic checks
        if (typeof name !== "string") throw new Error("Nom invalide ou manquant.");
        if (!image || typeof image !== "object" || !("type" in image)) throw new Error("Image manquante.");
        if (!/image\/(png|jpeg|webp|svg\+xml)/.test(image.type)) throw new Error("Format d'image invalide");
        // convert image
        const converted = sharp(await image.arrayBuffer()).resize({
            width: 256, height: 256,
            fit: "contain",
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        });
        // save name to db
        await connectToDB();
        const sponsor = await sponsorModel.create({ name });
        if (!sponsor || !sponsor._id) return serverError();
        // save image to file
        if (!fs.existsSync(sponsorDir)) fs.mkdirSync(sponsorDir); // check if sponsor dir exist
        converted.toFile(`${sponsorDir}/${sponsor._id}.webp`);
        // return the id if ok
        return new Response(JSON.stringify({
            created: sponsor._id,
        }));
    } catch (err) {
        return handleError(err);
    }
}

// Remove a sponsor
// DELETE /api/sponsor
// head: session -- body: sponsor - { name | id }
export const DELETE = async (req: Request) => {
    try {
        // check session and right
        const userSession = await checkSession();
        if (!userSession) return needLoginError();
        if (userSession.right < 1) return unauthorizedError();
        // get the form data
        const body = await req.formData();
        const target = body.get("target");
        if (typeof target !== "string") return invalidDataError();
        // defines what is the selection mode
        let filter = isValidObjectId(target) ? { _id: target } : { name: target };
        // try to delete
        await connectToDB();
        const deleted = await sponsorModel.findOneAndDelete(filter);
        if (!deleted || !("name" in deleted) || !("_id" in deleted)) throw new Error("Sponsor non trouvé! merci de réessayer.");
        fs.unlinkSync(`${sponsorDir}/${deleted._id}.webp`);
        // success
        return new Response(`Sponsor ${deleted.name} supprimé avec succès.`);

    } catch (err) {
        return handleError(err);
    }
}
