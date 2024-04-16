import mongoose from "mongoose";
import { z } from "zod";

const zodCheck = {
    message: z.string().regex(/^.{1,2000}$/i, "Votre message ne peux pas faire plus de 2000 charactères")
};

const ForumSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    message: {
        type: String,
        trim: true,
        required: true,
    }
}, {
    timestamps: true
});

export const createPostCheck = z.object(zodCheck);

export default mongoose.models.Forum || mongoose.model("Forum", ForumSchema);
