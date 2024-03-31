import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const strapiUrl = process.env.STRAPI_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials == null) return null;
        try {
          const { user, jwt } = await signIn({
            email: credentials.email,
            password: credentials.password,
          });
          return { ...user, jwt };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token }) => {
        return {
            ...session,
            user: {
                ...session.user,
                id: token.id,
                username: token.name,
                email: token.email,
            },
        };
    },
    jwt: ({ token, user }) => {
        if (user) {
            const u = user as unknown as { id: number, username: string, email: string };
            return {
                ...token,
                id: u.id,
            }
        }

        return token;
    }
},
};

async function signIn({ email, password }: {
    email: string,
    password: string
}) {
    const res = await fetch(`${strapiUrl}/api/auth/local`, {
      method: "POST",
      body: JSON.stringify({
        identifier: email,
        password,
      })
    });

    return await res.json();
  }