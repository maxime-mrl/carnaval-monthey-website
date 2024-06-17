"use server"

import listsModel from "@models/lists.model";
import checkSession from "@utils/api/checkSession";
import { connectToDB } from "@utils/db";
import parseErrors from "@utils/parseErrors";

export const addEvent = async (_prevState:any, form: FormData) => {
    try {
        // get new event
        const event = [
            form.get("event-day") as string,
            form.get("event-name") as string,
            form.get("event-time") as string,
            form.get("event-place") as string
        ];
        if (form.get("event-infos")) event.push(form.get("event-infos") as string);

        // check session and right
        const userSession = await checkSession();
        console.log(userSession)
        if (!userSession) throw new Error("Tu dois etre connecter pour faire ça.");
        if (userSession.right < 1)  throw new Error("Tu n'as pas la permission pour faire ça!");

        // basic checks
        if (event.length < 4) throw new Error("merci de remplir tout les champs");
        event.forEach(elem => {if (typeof elem !== "string" || elem.length === 0) throw new Error("merci de remplir tout les champs")});
        // find existing events
        const existingEvents = await listsModel.findOne({ identifier: "events" })
        if (!existingEvents) await listsModel.create({ identifier: "events", elements: [[]] });
        // check if same events arleady exist
        else if (existingEvents.elements.find((elem: string[]) => elem[1] === event[1])) throw new Error("Les noms d'événements doivent etre unique")

        // save to db
        const elements = existingEvents && existingEvents.elements ? [ ...existingEvents.elements, event ] : [ event ]
        await connectToDB();
        const events = await listsModel.findOneAndUpdate({ identifier: "events" }, { elements });
        if (!events || !events._id) throw new Error("Une erreur est survenue merci de réessayer");
        return {
            message: "success",
        };
    } catch (err:any) {
        return { message: parseErrors(err) }
    }
}

export const deleteEvent = async (name:string) => {
    try {
        // check session and right
        const userSession = await checkSession();
        if (!userSession) throw new Error("Tu dois etre connecter pour faire ça.");
        if (userSession.right < 1)  throw new Error("Tu n'as pas la permission pour faire ça!");
        // find existing events
        await connectToDB();
        const dbElements = (await listsModel.findOne({ identifier: "events" })).elements as string[][];
        // try to delete one event
        const elements = dbElements.filter(event => event[1] !== name);
        if (dbElements.length === elements.length) throw new Error("événement non trouvé, merci de rééssayer!");
        // update db
        const events = await listsModel.findOneAndUpdate({ identifier: "events" }, { elements });
        if (!events || !events._id) throw new Error("Une erreur est survenue merci de réessayer");
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