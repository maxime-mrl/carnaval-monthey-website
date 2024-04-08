import mongoose from "mongoose";
import { z } from "zod";

const zodCheck = {
    text: z.string().regex(/^.{3,2000}$/i, "Le texte doit faire entre 3 et 2000 charactère, sinon ça va casser!"),
    identifier: z.string().regex(/^[a-z0-9_-]{3,50}$/i, 'Identifiant invalide.'),
}

const TextSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    identifier: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    }
});

export const setTextCheck = z.object(zodCheck);

export const deleteTextCheck = z.object({
    identifier: zodCheck.identifier
});


export default mongoose.models.Text || mongoose.model("Text", TextSchema);
