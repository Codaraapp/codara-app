import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { prisma } from "../db/prisma";
import type { Session } from "next-auth";
import { cookies } from "next/headers";

export const config = {
  providers: [
    GitHub({
      authorization: { params: { scope: "read:user user:email repo project" } },
    }),
    Google,
  ],
  callbacks: {
    // authorized({ request, auth }) {
    //   const { pathname } = request.nextUrl;
    //   if (pathname === "/middleware-example") return !!auth;
    //   return true;
    // },
    session({ session, token }: { session: Session; token: any }) {
      session.user.id = token.id;
      if (session && !session.user.is_complete) {
        session.user.is_complete = token.is_complete;
      }
      return session;
    },
    async jwt({ token, trigger, account, profile }) {
      if (profile) {
        const dbUser = await prisma.users.findUnique({
          where: {
            email: profile.email || "",
            provider: account?.provider,
          },
        });
        if (!dbUser) {
          throw new Error("No user found");
        }
        token.id = dbUser.id;
        token.is_complete = dbUser.is_complete;
      }
      return token;
    },
    async signIn({ account, profile }) {
      console.log("signIn", account);
      console.log("profile", profile);
      if (!profile?.email || !account) {
        throw new Error("No profile");
      }

      let organizationType = "";
      let organizationName = "";
      let isComplete = false;

      if (cookies().has("form_org_name") && cookies().has("form_org_type")) {
        organizationName = cookies().get("form_org_name")?.value || "";
        organizationType = cookies().get("form_org_type")?.value || "";
        isComplete = true;
      }

      const profileUrl = profile?.avatar_url;
      await prisma.users.upsert({
        where: {
          email: profile.email,
          provider: account.provider,
        },
        create: {
          email: profile.email,
          organization_name: organizationName,
          organization_type_id: organizationType,
          name_surname: profile.name || "",
          provider: account.provider,
          sso_id: account.providerAccountId,
          create_at: new Date(),
          update_at: new Date(),
          is_complete: isComplete,
          avatar_img_url: profileUrl,
        },
        update: {
          update_at: new Date(),
        },
      });
      cookies().set("form_org_name", "", { maxAge: 0 });
      cookies().set("form_org_type", "", { maxAge: 0 });
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
