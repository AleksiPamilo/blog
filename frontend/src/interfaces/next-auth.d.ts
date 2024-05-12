import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            slug?: string
        } & DefaultSession["user"]
    }
}