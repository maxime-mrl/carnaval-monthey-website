import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import userModel from "@models/user.model";
import type { ObjectId } from "mongodb";
import { connectToDB } from "@utils/db";

interface userSession {
    _id: ObjectId,
    mail: string,
    username: string,
    right: number,
    password: string
}


// check session and return the full and up to date user object from db, with or without password depending on the presence or not of password param
async function checkSession(): Promise<Omit<userSession, "password"> | false>;
async function checkSession(password: true): Promise<userSession | false>;
async function checkSession(password?: true) : Promise<(Omit<userSession, "password"> & { password: string }) | false> {
    const session = await getServerSession(authOptions);
    if (!session?.user ||  !("_id" in session.user)) return false;
    await connectToDB()
    const user = password ?
        await userModel.findById(session.user._id).select(["-__v"]) :
        await userModel.findById(session.user._id).select(["-password", "-__v"])
    ;
    if (!user) return false;
    return user;
};

export default checkSession;