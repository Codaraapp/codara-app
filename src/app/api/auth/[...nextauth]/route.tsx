import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { session } from "@/app/core/auth/session";
import { prisma } from "@/app/core/db/prisma";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GG_ID as string,
      clientSecret: process.env.GG_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // console.log("signIn", profile);
      if (!profile?.email || !account) {
        throw new Error("No profile");
      }
      await prisma.users.upsert({
        where: {
          email: profile.email,
          provider: account.provider,
        },
        create: {
          email: profile.email,
          name_surname: profile.name || "",
          provider: account.provider,
          sso_id: account.providerAccountId,
          create_at: new Date(),
          update_at: new Date(),
          is_complete: false,
          avatar_img_url: profile.avatar_url,
        },
        update: {
          update_at: new Date(),
        },
      });
      return true;
    },
    session,
    async jwt({ token, user, account, profile }) {
      if (profile) {
        const dbUser = await prisma.users.findUnique({
          where: {
            email: profile.email,
            provider: account?.provider,
          },
        });
        if (!dbUser) {
          throw new Error("No user found");
        }
        token.id = dbUser.id;
        token.is_compete = dbUser.is_complete;
      }
      // console.log("Token:", token);

      return token;
    },
  },
};

const { handler, auth } = NextAuth(authOptions);
export { handler as GET, handler as POST, auth };
