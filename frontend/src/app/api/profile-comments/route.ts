import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const params = Array.from(req.nextUrl.searchParams.entries());
        const paramsObject = Object.fromEntries(params);
        const { slug, start, limit } = paramsObject;

        const apiUrl = `${strapiUrl}/api/profile-comments?populate[0]=post&populate[1]=author&populate[2]=author.avatar&populate[3]=commentedOn&filters[commentedOn][slug]=${slug}${start && "&pagination[start]=" + start}${limit && "&pagination[limit]=" + limit}&sort[0]=publishedAt:desc`;

        const fetchRes = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
        });

        const data = await fetchRes.json();
        return new NextResponse(JSON.stringify({
            data: data.data,
            meta: data.meta
        }), { status: 200 })
    } catch (err) {
        return new NextResponse("Internal server error", { status: 500 })
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);
        const apiUrl = `${strapiUrl}/api/profile-comments`;
        const { content, commentedOn } = await req.json();

        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!commentedOn || isNaN(commentedOn)) {
            return new NextResponse("Bad Request", { status: 400 })
        }

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + session.jwt
            },
            body: JSON.stringify({
                author: session.id,
                content: String(content),
                commentedOn: commentedOn,
            })
        });

        if (response.status === 403) {
            return new NextResponse("Forbidden", { status: 403 })
        } else if (response.status === 200) {
            const json = await response.json();
            const comment = json.data;

            return new NextResponse(JSON.stringify({
                comment: comment
            }), { status: 200 })
        } else {
            return new NextResponse("Unexpected error", { status: 500 })
        }
    } catch {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}