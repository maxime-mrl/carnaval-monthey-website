import sponsorModel from "@models/sponsor.model";
import handleError from "@utils/api/errorHandler";
import { serverError } from "@utils/api/genericResponse";
import { connectToDB } from "@utils/db";

export const revalidate = 3600;

// Get sponsors list
// GET /api/sponsor
// head: null -- body: null
export const GET = async () => {
    try {
        await connectToDB();
        const sponsors = await sponsorModel.find({ }).select(["-__v"]);
        if (!sponsors || !Array.isArray(sponsors)) return serverError();
        return new Response(JSON.stringify([
            ...sponsors
        ]));
    } catch (err) {
        return handleError(err);
    }
}
