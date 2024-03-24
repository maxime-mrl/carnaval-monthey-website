import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import userModel from "@models/user.model";
import type { ObjectId } from "mongodb";
import { connectToDB } from "@utils/db";

type userSession = {
    _id: ObjectId,
    mail: string,
    username: string,
    right: number
}

export default async function checkSession(): Promise<userSession|false> {
    const session = await getServerSession(authOptions);
    if (!session?.user ||  !("_id" in session.user)) return false;
    await connectToDB()
    const user = await userModel.findById(session.user._id).select(["-password", "-__v"]);
    if (!user) return false;
    return user;
}