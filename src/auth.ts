import NextAuth, { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"

export const authConfig: NextAuthConfig = {
  // Configure one or more authentication providers
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
} as NextAuthConfig;

export const { handlers, auth, signOut, signIn } = NextAuth(authConfig);