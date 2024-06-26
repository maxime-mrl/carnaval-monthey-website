"use server"
import { connectToDB } from "@utils/db";
import checkSession from "@utils/checkSession";
import textModel, { setTextCheck } from "@models/text.model";

export default async function editCustomText(body:{text:string, identifier:string}) {
    try {
        // check session and right
        const userSession = await checkSession();
        if (!userSession) return false;
        if (userSession.right < 1) return false;
        // get the data
        const { text, identifier } = setTextCheck.parse(body);
        // update the text
        await connectToDB();
        const updatedUser = await textModel.findOneAndUpdate({ identifier }, { text }, { new: true });
        if (!updatedUser) throw new Error("Impossible de mettre à jour le texte, merci de réesseayer.");
        return true;
    } catch (err) {
        return false;
    }
}