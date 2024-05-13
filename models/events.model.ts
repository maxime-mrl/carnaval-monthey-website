import mongoose from "mongoose";
import { z } from "zod";

const zodCheck = {
    date: z.string(),
    title: z.string(),
    time: z.string(),
    place: z.string(),
    infos: z.optional(z.string()),
}

const EventsSchema = new mongoose.Schema({
    date: {
        type: String,
        trim: true,
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    time: {
        type: String,
        trim: true,
        required: true,
    },
    place: {
        type: String,
        trim: true,
        required: true,
    },
    infos: {
        type: String,
        trim: true,
    }
});

export const setEventsCheck = z.array(z.object(zodCheck));


export default mongoose.models.Events || mongoose.model("Events", EventsSchema);
