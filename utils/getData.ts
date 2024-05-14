import eventsModel from "@models/events.model";
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

type events = {
    date: string,
    title: string,
    time: string,
    place: string,
    infos: string | null,
}

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
})
