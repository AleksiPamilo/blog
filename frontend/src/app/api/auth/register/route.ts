import { hash, genSalt } from "bcryptjs";
import { NextResponse } from "next/server";

const strapiUrl = process.env.STRAPI_URL;

export async function POST(req: Request) {
    try {
        const { name, email, password } = (await req.json()) as {
            name: string;
            email: string;
            password: string;
        };

        const hashPassword = async (password: string): Promise<string> => {
            const salt = await genSalt(12);
            const hashedPassword = await hash(password, salt);
            return hashedPassword;
        }

        const res = await fetch(`${strapiUrl}/api/local/register`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                username: name,
                password: await hashPassword(password),
            })
        });

        const user = await res.json();

        console.log(user);

        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (e: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: e.message,
            }),
            { status: 500 }
        )
    }
}