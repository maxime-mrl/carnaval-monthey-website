import listsModel from "@models/lists.model";
import sponsorModel from "@models/sponsor.model";
import textModel from "@models/text.model";
import userModel from "@models/user.model";
import { connectToDB } from "@utils/db";
import { cache } from "react";

export const revalidate = 3600;

type list = {
    identifier: string,
    elements: string[][],
}

type textData = {
    identifier: string,
    text: string
}[];

export const getTexts = cache(async () => {
    try  {
        await connectToDB();
        const texts = new Map();
        const data = await textModel.find({ }).select([ "text", "identifier", "-_id" ]) as textData;
        data.forEach(({identifier, text}) => texts.set(identifier, text));
        return texts;
    } catch (err) {
        return new Map();
    }
})

export const getSponsors = cache(async () => {
    try {
        await connectToDB();
        const sponsors = await sponsorModel.find({ }).select(["-__v"]);
        if (!sponsors || !Array.isArray(sponsors)) return [];
        return sponsors.map(sponsor => ({ id: sponsor._id.toString(), alt: sponsor.name.toString() }));
    } catch (err) {
        return [];
    }
});

export const getList = cache(async (identifier: string) => {
    try {
        await connectToDB();
        const list = await listsModel.findOne({ identifier }).select(["identifier", "elements", "-_id"]) as list;
        return list;
    } catch (err) {
        return {
            identifier: "error",
            elements: []
        };
    }
});

export const getTopUser = cache(async () => {
    try {
        await connectToDB();
        return await userModel
            .find({  })
            .select(['username', 'points', "-_id"])
            .sort({ points: -1 })
            .limit(10);
    } catch (err) {
        return [];
    }
});
