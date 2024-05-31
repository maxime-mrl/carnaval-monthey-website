"use server"

import userModel from "@models/user.model";
import authOptions from "@utils/authOptions";
import { connectToDB } from "@utils/db";
import { getServerSession } from "next-auth";
import { stripe } from "@utils/stripe"
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export const buyItem = async (itemID:string) => {
    "use server"
    try {
        // get user
        const authSession = await getServerSession(authOptions);
        const userSession = (authSession && authSession.user) ? authSession.user as { _id: string, username: string, right: number } : null;
        // try to get existing stripe id
        await connectToDB();
        const user = await userModel.findById(userSession?._id);
        if (user && !user.stripeId) { // if no id create a new customer
            const stripeCustomer = await stripe.customers.create({
                email: user.mail,
            });
            await userModel.updateOne(user, { stripeId: stripeCustomer.id });
            user["stripeId"] = stripeCustomer.id;
        }
        const session = await stripe.checkout.sessions.create({
            customer: user.stripeId ?? "",
            mode: "payment",
            payment_method_types: [ "card" ],
            line_items: [{
                price: itemID,
                quantity: 1,
            }],
            success_url: `http://localhost:3000/`,
            cancel_url: `http://localhost:3000/shop`
        });
        console.log(session.url)
        redirect(session.url ?? "http://localhost:3000/shop");
    } catch (err) {
        if (isRedirectError(err)) throw err;
        console.log(err);
    } finally {
    }
}