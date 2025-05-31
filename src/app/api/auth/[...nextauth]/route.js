//  [...nextauth]/route.js
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from "@/lib/models/userModel";
import { ConnectDB } from "@/lib/config/db";

// Export just the authOptions
export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await ConnectDB();
        const user = await UserModel.findOne({ email: credentials.email }).select("+password");
        
        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await ConnectDB();

      const existingUser = await UserModel.findOne({
        email: user.email,
      });

      if (!existingUser) {
        const newUser = await UserModel.create({
          name: user.name,
          email: user.email,
          image: user.image,
          role: "user",
          provider: account.provider,
        });
        return newUser;
      }
      return existingUser;
    },
    async jwt({ token, user }) {
        // First time: `user` is available when setting up cookie in browser
      if (user) {
        await ConnectDB();
        const userInDb = await UserModel.findOne({ email: user.email });

        if (userInDb) {
          token._id = userInDb._id.toString();
          token.role = userInDb.role;
          token.name = userInDb.name;
          token.provider = userInDb.provider;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id;
      session.user.role = token.role;
      session.user.provider = token.provider;
      return session;
    },
  },
  pages: {
    signOut: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}