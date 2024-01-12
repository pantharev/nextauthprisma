import NextAuth, { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const authConfig: NextAuthConfig = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user }: {session: any, user: any}) {
      session.user.id = user.id;
      return session;
    },
    // authorized({ auth, request: { nextUrl }}) {
    //     const isLoggedIn = !!auth?.user;
    //     const paths = ['/protected', "/dashboard"]; // add more protected paths here
    //     const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path));

    //     if(isProtected && !isLoggedIn) {
    //         const redirectUrl = new URL("api/auth/signin", nextUrl.origin);
    //         redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
    //         return Response.redirect(redirectUrl);
    //     }

    //     return true;
    // }
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
} as NextAuthConfig;

export const { handlers, auth, signOut, signIn } = NextAuth(authConfig);