import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@utils/db";
import userModel, { loginUserCheck } from "@models/user.model";


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        mail: { label: "Email", type: "text", placeholder: "Ton e-mail" },
        username: { label: "Username", type: "text", placeholder: "Ton nom d'utilisateur" },
        password: { label: "Password", type: "password", placeholder: "Ton mot de passe" },
        _id: { type: "text" },
      },
      async authorize(credentials) { // login
        console.log("login")
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
            right: user.right
          }
          return returnUser;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token.user) session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
  },
  pages: { signIn: "/" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };