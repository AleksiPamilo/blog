import { authOptions } from "@/lib/auth";
import createSlug from "@/utils/createSlug";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);
        const { newUsername } = await req.json();

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!newUsername) {
            return new NextResponse("Bad request: 'newUsername' missing!", { status: 403 });
        }

        const response = await fetch(strapiUrl + "/api/users-permissions/changeUsername", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session.jwt}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                newUsername,
                slug: `@${createSlug(newUsername)}`
            }),
        });

        const data = await response.json();
        return new NextResponse(JSON.stringify(data), { status: response.status })
    } catch (err) {
        console.log(err)
        return new NextResponse("Internal server error", { status: 500 });
    }
}
