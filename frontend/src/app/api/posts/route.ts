import { NextRequest, NextResponse } from "next/server";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const params = Array.from(req.nextUrl.searchParams.entries());
        const paramsObject = Object.fromEntries(params);
        const { slug, populate, limit, sort } = paramsObject;

        let apiUrl = `${strapiUrl}/api/posts`;

        if (slug) {
            apiUrl += `?filters[slug]=${slug}`;
        }

        if (populate) {
            const populateOptions = populate.split(',').map((option, index) => `populate[${index}]=${option}`).join('&');
            apiUrl += apiUrl.includes('?') ? `&${populateOptions}` : `?${populateOptions}`;
        }

        if (limit) {
            apiUrl += apiUrl.includes('?') ? `&pagination[limit]=${limit}` : `?pagination[limit]=${limit}`;
        }

        if (sort === "true") {
            apiUrl += apiUrl.includes('?') ? "&sort[0]=publishedAt:desc" : "?sort[0]=publishedAt:desc";
        }

        const fetchRes = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
        });

        const data = await fetchRes.json();

        return new NextResponse(JSON.stringify({
            data: data.data,
        }), { status: 200 })
    } catch (err) {
        return new NextResponse("Internal server error", { status: 500 })
    }
}