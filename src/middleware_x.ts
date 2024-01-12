
import NextAuth from 'next-auth';
import { authConfig } from './auth';

export default NextAuth(authConfig).auth;

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}