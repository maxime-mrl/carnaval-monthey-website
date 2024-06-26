import mongoose from "mongoose";
import { z } from "zod";

const zodCheck = {
    username: z.string().regex(/^[a-z0-9_-]{3,20}$/i, "Nom d'utilisateur invalide (entre 3 et 20 charactères)."),
    mail: z.string().regex(/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/i, 'E-mail invalide.'),
    password: z.string().min(6, 'Ton mot de passe devrait faire au moins 6 charactères.'),
}

const UserSchema = new mongoose.Schema({
    mail: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0
    },
    right: {
        type: Number,
        default: 0
    },
    stripeId: {
        type: String,
    }
});

export const registerUserCheck = z.object({
    username: zodCheck.username,
    mail: zodCheck.mail,
    password: zodCheck.password,
});

export const loginUserCheck = z.object({
    mail: zodCheck.mail,
    password: zodCheck.password,
});

export const deleteUserCheck = z.object({
    checkPassword: zodCheck.password,
});

export const updateUserCheck = z.object({
    mail: z.optional(zodCheck.mail),
    username: z.optional(zodCheck.username),
    password: z.optional(zodCheck.password),
    checkPassword: zodCheck.password,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
