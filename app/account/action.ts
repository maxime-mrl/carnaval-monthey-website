"use server"

import bcrypt from "bcrypt";
import userModel, { deleteUserCheck, updateUserCheck } from "@models/user.model";
import { connectToDB } from "@utils/db"
import parseErrors from "@utils/parseErrors";
import checkSession from "@utils/api/checkSession";
import { isValidObjectId } from "mongoose";

// Get user mail with its ID
export const getMail = async (id:string) => {
    try {
        await connectToDB();
        const user = await userModel.findById(id);
        if (!user || !user.mail) throw new Error("Utilisateur non trouvé");
        return user.mail;
    } catch (err) {
        return {
            success: false,
            error: parseErrors(err)
        };
    }
}

// Change account infos for users
export const UpdateAccount = async (body:{ username?: string, mail?:string, password?:string, checkPassword:string }) => {
    try {
        // retrieve session
        const userSession = await checkSession(true);
        if (!userSession) throw new Error("Tu dois être connécter pour faire ça!");
        // user logged -> check request and password
        const { checkPassword, ...toUpdate } = updateUserCheck.parse(body);
        if (!toUpdate.mail && !toUpdate.username && !toUpdate.password) throw new Error("Tu dois au moins mettre a jour un élément.");
        if (!(await bcrypt.compare(checkPassword, userSession.password))) throw new Error("Mot de passe incorrect");
        // update user
        if (typeof toUpdate.password === "string") toUpdate.password = await bcrypt.hash(toUpdate.password, 10); // check if passord encrypt it
        const updatedUser = await userModel.findByIdAndUpdate(userSession._id, toUpdate, { new: true });
        if (!updatedUser) throw new Error("Impossible de mettre à jour votre compte, merci de réesseayer.");
        return {
            success: true
        };
    } catch (err) {
        console.log(err)
        return {
            success: false,
            error: parseErrors(err)
        };
    }
}

// Delete user account
export const deleteAccount = async (body:{ checkPassword:string }) => {
    try {
        // retrieve session
        const userSession = await checkSession(true);
        if (!userSession) throw new Error("Tu dois être connécter pour faire ça!");
        // user logged -> check password
        const { checkPassword } = deleteUserCheck.parse(body);
        if (!(await bcrypt.compare(checkPassword, userSession.password))) throw new Error("Mot de passe incorrect");
        // user logged and password match -> proceed
        await connectToDB();
        await userModel.findByIdAndDelete(userSession._id);
        return {
            success: true
        }
    } catch(err) {
        return {
            success: false,
            error: parseErrors(err)
        };
    }
}

// Change rights of user by an admin
export const changeRights = async (body: { right: number, target: string }) => {
    try {
        // retrieve session and check rights
        const userSession = await checkSession(true);
        if (!userSession) throw new Error("Tu dois être connécter pour faire ça!");
        if (userSession.right < 2) throw new Error("Tu n'as pas la permission de faire ceci...");
        // check the request
        if (!body || !("right" in body) || !("target" in body) || isNaN(body.right)) throw new Error("données invalides");
        // defines what is given to target the user (mail - id - username)
        let targetType:{ mail?:string, _id?:string, username?:string } = {};
        if (/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(body.target)) targetType.mail = body.target; // is a mail
        else if (isValidObjectId(body.target)) targetType._id = body.target; // is an object id
        else targetType.username = body.target; // is something else so we hope it's an username
        // search for user
        const user = await userModel.findOne(targetType);
        if (!user || !("_id" in user)) throw new Error("Compte introuvable");
        // update user
        const updatedUser = await userModel.findByIdAndUpdate(user._id, { right: body.right }, { new: true });
        if (!updatedUser) throw new Error("Impossible de mettre a jour l'utilisateur séléctionné.");
        return {
            success: true
        }
    } catch (err) {
        return {
            success: false,
            error: parseErrors(err)
        };
    } 
}