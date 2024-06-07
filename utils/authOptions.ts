import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@utils/db";
import userModel, { loginUserCheck } from "@models/user.model";
import type { AuthOptions } from "next-auth";

// authoptions splited so it can be exported

// HANDLE LOGIN AND SESSION CHECK
const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        id: "credentials-login",
        name: "credentials",
        credentials: {
          mail: { label: "Email", type: "text", placeholder: "Ton e-mail" },
          username: { label: "Username", type: "text", placeholder: "Ton nom d'utilisateur" },
          password: { label: "Password", type: "password", placeholder: "Ton mot de passe" },
        },
        async authorize(credentials) { // login
          const parsed = loginUserCheck.safeParse(credentials);
          if (!parsed.success) return null;
          const { mail, password } = parsed.data;
          try {
            await connectToDB();
            const user = await userModel.findOne({ mail });
            // check user
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (!passwordsMatch) return null;
            // return user
            const returnUser:any = { // using any not great but for now I want this to work, will fix it later if needed
              _id: user._id,
              username: user.username,
              right: user.right,
            }
            return returnUser;
          } catch (error) {
            console.log("Error: ", error);
            return null;
          }
        },
      }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }) {
        // not sure if we should check validity with db (for now it works for deleted user as long as we have the session)
        if (token.user) session.user = token.user;
        return session;
      },
      async jwt({ token, user }) {
        if (user) token.user = user;
        return token;
      },
    },
    pages: { signIn: "/login" },
};

export default authOptions;
  