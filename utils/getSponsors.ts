import sponsorModel from "@models/sponsor.model";
import { connectToDB } from "@utils/db";
import { cache } from "react";

export const getSponsors = cache(async () => {
    try {
        await connectToDB();
        const sponsors = await sponsorModel.find({ }).select(["-__v"]);
        if (!sponsors || !Array.isArray(sponsors)) return [];
        return sponsors.map(sponsor => ({ src: `/sponsor/${sponsor._id}.webp`, alt: sponsor.name }));
    } catch (err) {
        return [];
    }
});
