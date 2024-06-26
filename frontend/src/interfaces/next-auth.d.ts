import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            slug?: string;
            id?: number;
            emailConfirmed?: boolean;
        } & DefaultSession["user"];
        jwt: string;
        id: number;
    }
}