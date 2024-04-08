import textModel from "@models/text.model";
import handleError from "@utils/api/errorHandler";
import { serverError } from "@utils/api/genericResponse";
import { connectToDB } from "@utils/db";

export const revalidate = 3600;

// Get texts elements
// GET /api/text
// head: null -- body: null
export const GET = async () => {
    try {
        await connectToDB();
        const texts = await textModel.find({ }).select(["-_id", "-__v"]);
        if (!texts || !Array.isArray(texts)) return serverError();
        return new Response(JSON.stringify(texts));
    } catch (err) {
        return handleError(err);
    }
}
