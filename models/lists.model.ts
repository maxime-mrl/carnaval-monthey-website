import mongoose from "mongoose";
import { z } from "zod";

// const zodCheck = {
//     identifier: z.string().regex(/^[a-z0-9_-]{3,50}$/i, 'Identifiant invalide.'),
// }

const ListsSchema = new mongoose.Schema({
    identifier: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    elements: {
        type: [ [ String ] ],
        required: true,
    },
});

// export const setListCheck = z.array(z.object(zodCheck));


export default mongoose.models.Lists || mongoose.model("Lists", ListsSchema);
