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
    infos: string,
}

export const getEvents = cache(async () => {
    try {
        await connectToDB();
        const events = await eventsModel.find({ }).select(["-__v"]) as events[];
        const parsedevents: Map<string, events[]> = new Map()
        events.forEach(event => {
            const existingEvents = parsedevents.get(event.date);
            if (existingEvents) {
                existingEvents.push(event);
                parsedevents.set(event.date, existingEvents);
            } else {
                parsedevents.set(event.date, [ event ]);
            }
        });
    } catch (err) {
        return []
    }
})
