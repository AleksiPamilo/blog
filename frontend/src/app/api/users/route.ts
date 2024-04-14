import { NextRequest, NextResponse } from "next/server";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const slug = req.nextUrl.searchParams.get("slug");
        const populate = req.nextUrl.searchParams.get("populate");

        let apiUrl = `${strapiUrl}/api/users`;

        if (slug) {
            apiUrl += `?filters[slug]=${slug}`;
        }

        if (populate) {
            const populateOptions = populate.split(',').map((option, index) => `populate[${index}]=${option}`).join('&');
            apiUrl += apiUrl.includes('?') ? `&${populateOptions}` : `?${populateOptions}`;
        }

        const fetchRes = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
        });

        const data = await fetchRes.json();

        return new NextResponse(JSON.stringify({
            data: data,
        }), { status: 200 })
    } catch {
        return new NextResponse("Internal server error", { status: 500 })
    }
}