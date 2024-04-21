import { NextRequest, NextResponse } from "next/server";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const params = Array.from(req.nextUrl.searchParams.entries());
        const paramsObject = Object.fromEntries(params);
        const { slug, start, limit } = paramsObject;

        const apiUrl = `${strapiUrl}/api/comments?populate[0]=post&populate[1]=author&populate[2]=author.avatar&filters[post][slug]=${slug}${start && "&pagination[start]=" + start}${limit && "&pagination[limit]=" + limit}`;

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