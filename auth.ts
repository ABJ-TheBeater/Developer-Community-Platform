import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import connectMongo from "@/lib/Mongoose";
import User from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
  ],

  callbacks: {
    async signIn({ user }) {

      try {

        await connectMongo();

        const existingUser = await User.findOne({
          email: user.email,
        });

        if (!existingUser) {

          await User.create({
            name: user.name,
            email: user.email,
            username:
              user.email?.split("@")[0],

            image: user.image || "",

            bio: "",

            headline: "",

            github: "",

            linkedin: "",

            skills: [],
          });

        }

        return true;

      } catch (error) {

        console.log(error);

        return false;

      }

    },
  },
});