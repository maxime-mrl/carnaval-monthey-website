import eventsModel from "@models/events.model";
import sponsorModel from "@models/sponsor.model";
import textModel from "@models/text.model";
import userModel from "@models/user.model";
import { connectToDB } from "@utils/db";
import { cache } from "react";

export const revalidate = 3600;

type events = {
    date: string,
    title: string,
    time: string,
    place: string,
    infos: string | null,
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

export const getEvents = cache(async () => {
    try {
        await connectToDB();
        const events = await eventsModel.find({ }).select(["date", "title", "time", "place", "infos", "-_id"]) as events[];
        const parsedevents: Map<string, events[]> = new Map();
        events.forEach(event => {
            const updatedEvents = parsedevents.get(event.date) ? parsedevents.get(event.date) as events[] : [];
            updatedEvents.push({
                date: event.date,
                title: event.title,
                time: event.time,
                place: event.place,
                infos: event.infos ? event.infos : null,
            });
            parsedevents.set(event.date, updatedEvents);
        });
        return parsedevents;
    } catch (err) {
        return [];
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
