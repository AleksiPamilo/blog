import type { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface CustomUser extends User {
    jwt?: string;
    username?: string;
    slug?: string;
    emailConfirmed?: boolean;
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
                    const res = await fetch(apiUrl + `/users?id=${user.id}&populate=avatar`);
                    const userJson = await res.json();
                    const avatarUrl = userJson.data[0]?.avatar?.url;
                    const slug = userJson.data[0]?.slug;

                    return {
                        id: user.id,
                        name: user.username,
                        email: user.email,
                        emailConfirmed: user.emailConfirmed,
                        image: avatarUrl ? String(strapiUrl + avatarUrl) : null,
                        slug: slug,
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
            if (token) {
                if (token.jwt) {
                    session.jwt = token.jwt as string;
                }
                if (token.name) {
                    session.user.name = token.name;
                }
                if (token.slug) {
                    session.user.slug = token.slug as string;
                }
                if (typeof token.id === "number") {
                    session.user.id = token.id;
                }
                if (token.email) {
                    session.user.email = token.email;
                }
                if (typeof token.emailConfirmed === "boolean") {
                    session.user.emailConfirmed = token.emailConfirmed;
                }
            }

            return Promise.resolve(session);
        },
        async jwt({ token, user }) {
            if (typeof user?.id === "number") {
                token.id = user.id;
            }
            if (typeof (user as CustomUser)?.jwt === "string") {
                token.jwt = (user as CustomUser).jwt;
            }
            if (typeof (user as CustomUser)?.username === "string") {
                token.username = (user as CustomUser).username;
            }
            if (typeof (user as CustomUser)?.slug === "string") {
                token.slug = (user as CustomUser).slug;
            }
            if (typeof (user as CustomUser)?.email === "string") {
                token.email = (user as CustomUser).email;
            }
            if (typeof (user as CustomUser)?.emailConfirmed === "boolean") {
                token.emailConfirmed = (user as CustomUser).emailConfirmed;
            }

            return Promise.resolve(token);
        },
    },
};