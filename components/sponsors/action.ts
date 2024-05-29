"use server"
import fs from "fs";
import { connectToDB } from "@utils/db";
import checkSession from "@utils/api/checkSession";
import sponsorModel from "@models/sponsor.model";
import sharp from "sharp";

const sponsorDir = "public/sponsor";

export async function addSponsor(prevState:any, form: FormData) {
    try {
        const name = form.get("sponsor-name") as string;
        const image = form.get("sponsor-image") as File;
        // check session and right
        const userSession = await checkSession();
        if (!userSession) throw new Error("Tu dois etre connecter pour faire ça.");
        if (userSession.right < 1)  throw new Error("Tu n'as pas la permission pour faire ça!");
        // basic checks
        if (typeof name !== "string") throw new Error("Nom invalide ou manquant.");
        if (!image || typeof image !== "object" || !("type" in image)) throw new Error("Image manquante.");
        if (!/image\/(png|jpeg|webp|svg\+xml)/.test(image.type)) throw new Error("Format d'image invalide");
        // convert image
        const converted = sharp(await image.arrayBuffer()).resize({
            width: 256, height: 256,
            fit: "contain",
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        });
        // save name to db
        await connectToDB();
        const sponsor = await sponsorModel.create({ name });
        if (!sponsor || !sponsor._id) throw new Error("Une erreur est survenue merci de réessayer");
        // save image to file
        if (!fs.existsSync(sponsorDir)) fs.mkdirSync(sponsorDir); // check if sponsor dir exist
        converted.toFile(`${sponsorDir}/${sponsor._id}.webp`);
        return {
            message: "success",
        };
    } catch (err:any) {
        console.log("e")
        return {
            message: err.toString()
        };
    }
}

export async function deleteSponsor(id:string) {
    try {
        // check session and right
        const userSession = await checkSession();
        if (!userSession) throw new Error("Tu dois etre connecter pour faire ça.");
        if (userSession.right < 1)  throw new Error("Tu n'as pas la permission pour faire ça!");
        // try to delete
        await connectToDB();
        const deleted = await sponsorModel.findOneAndDelete({ _id: id });
        if (!deleted || !("name" in deleted) || !("_id" in deleted)) throw new Error("Sponsor non trouvé! merci de réessayer.");
        fs.unlinkSync(`${sponsorDir}/${deleted._id}.webp`);
        // success
        return {
            success: true,
        };

    } catch (err:any) {
        return {
            success: false,
            error: err.toString()
        };
    }
}