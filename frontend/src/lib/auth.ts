import type { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "@/interfaces";

interface ExtendedSession extends Session {
    jwt?: string;
}

interface ExtendedUser extends IUser {
    jwt?: string;
}

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Sign In",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "example@aleksipamilo.dev",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials || {};
                if (!email || !password) return null;

                try {
                    const response = await fetch(strapiUrl + "/api/auth/local", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            identifier: email,
                            password: password,
                        }),
                    });

                    const json = await response.json();
                    const { user, jwt } = json;

                    if (!user) return null;

                    const res = await fetch(apiUrl + `/api/users?id=${user.id}&populate=avatar`);
                    const userJson = await res.json();
                    const avatarUrl = userJson.data[0]?.avatar?.url;

                    return {
                        id: user.id,
                        name: user.username,
                        image: avatarUrl ? String(strapiUrl + avatarUrl) : null,
                        slug: userJson.slug,
                        jwt: jwt,
                    };
                } catch {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (typeof token.jwt === "string") {
                (session as ExtendedSession).jwt = token.jwt;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user && typeof token.jwt === "string") {
                (user as unknown as ExtendedUser).jwt = token.jwt;
            }
            return token;
        },
    },
};