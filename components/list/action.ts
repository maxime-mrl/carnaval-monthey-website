"use server"

import listsModel from "@models/lists.model";
import checkSession from "@utils/checkSession";
import { connectToDB } from "@utils/db";
import parseErrors from "@utils/parseErrors";

export const addEvent = async (_prevState:any, form: FormData) => {
    try {
        // get new element
        let newElem = form.get("new-elem") as String;
        const item = newElem.split(",")
        
        const identifier = form.get("identifier") as String;
        if (!identifier) throw new Error("Une erreur inconnue est survenu essayez de réactualiser la page.")

        // check session and right
        const userSession = await checkSession();
        if (!userSession) throw new Error("Tu dois etre connecter pour faire ça.");
        if (userSession.right < 1)  throw new Error("Tu n'as pas la permission pour faire ça!");

        // basic checks
        if (item.length < 1) throw new Error("Merci de remplir tout les champs");
        item.forEach(elem => {if (typeof elem !== "string" || elem.length === 0) throw new Error("Merci de remplir tout les champs")});
        // find existing elements
        const existingList = await listsModel.findOne({ identifier })
        if (!existingList) await listsModel.create({ identifier, elements: [[]] });
        // check if same events arleady exist
        else if (existingList.elements.find((elem: string[]) => elem[0] === item[0])) throw new Error(`La première partie de l'élément (${item[0]}) doit être unique!`)

        // save to db
        const elements = existingList && existingList.elements ? [ ...existingList.elements, item ] : [ item ]
        await connectToDB();
        const list = await listsModel.findOneAndUpdate({ identifier }, { elements });
        if (!list || !list._id) throw new Error("Une erreur est survenue merci de réessayer");
        return {
            message: "success",
        };
    } catch (err:any) {
        return { message: parseErrors(err) }
    }
}

export const deleteEvent = async (identifier:string, elem:string) => {
    try {
        // check session and right
        const userSession = await checkSession();
        if (!userSession) throw new Error("Tu dois etre connecter pour faire ça.");
        if (userSession.right < 1)  throw new Error("Tu n'as pas la permission pour faire ça!");
        // find existing list
        await connectToDB();
        const dbElements = (await listsModel.findOne({ identifier })).elements as string[][];
        // try to delete one element
        const elements = dbElements.filter(listElem => listElem[0] !== elem);
        if (dbElements.length === elements.length) throw new Error("élément non trouvé, merci de rééssayer!");
        // update db
        const list = await listsModel.findOneAndUpdate({ identifier }, { elements });
        if (!list || !list._id) throw new Error("Une erreur est survenue merci de réessayer");
        // success
        return {
            success: true,
        };
    } catch (err:any) {
        return {
            success: false,
            error: parseErrors(err)
        };
    }
    
}