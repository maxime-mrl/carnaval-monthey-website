"use server"

import sponsorModel from "@models/sponsor.model";
import { connectToDB } from "@utils/db";

export async function getSponsors() {
    try {
        await connectToDB();
        const sponsors = await sponsorModel.find({ }).select(["-__v"]);
        if (!sponsors || !Array.isArray(sponsors)) return [];
        return sponsors.map(sponsor => ({ src: `/sponsor/${sponsor._id}.webp`, alt: sponsor.name }));
    } catch (err) {
        return []
    }
}