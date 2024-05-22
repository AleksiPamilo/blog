import { authOptions } from "@/lib/auth";
import createSlug from "@/utils/createSlug";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import sanitize from "sanitize-html";

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

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);
        const apiUrl = `${strapiUrl}/api/posts`;
        const { title, description, tags, draft } = await req.json();

        const sanitizedDescription = sanitize(description, {
            allowedTags: sanitize.defaults.allowedTags.concat(["pre", "code"]),
            allowedAttributes: {
                code: ["class"]
            },
            allowedClasses: {
                code: [/^language-\w+/]
            }
        });

        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!title || !description) {
            return new NextResponse("Bad Request", { status: 400 })
        }

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + session.jwt
            },
            body: JSON.stringify({
                author: session.user.id,
                description: sanitizedDescription,
                title: title,
                slug: createSlug(title, true),
                publishedAt: draft === true ? null : new Date().toISOString(),
                ...(tags && { tags: tags })
            })
        });

        if (response.status === 403) {
            return new NextResponse("Forbidden", { status: 403 })
        } else if (response.status === 200) {
            return new NextResponse("Success", { status: 200 })
        } else {
            console.log(response.statusText)
            return new NextResponse("Unexpected error", { status: 500 })
        }
    } catch (e) {
        console.error(e)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);
        const apiUrl = `${strapiUrl}/api/posts/`;
        const { title, description, tags, draft, id } = await req.json();

        const sanitizedDescription = sanitize(description, {
            allowedTags: sanitize.defaults.allowedTags.concat(["pre", "code"]),
            allowedAttributes: {
                code: ["class"]
            },
            allowedClasses: {
                code: [/^language-\w+/]
            }
        });

        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if ((title && title.length < 5) || (description && description.length < 50) || !id) {
            return new NextResponse("Bad Request", { status: 400 });
        }

        const response = await fetch(apiUrl + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + session.jwt
            },
            body: JSON.stringify({
                id: id,
                description: sanitizedDescription,
                updatedAt: new Date().toISOString(),
                publishedAt: draft === true ? null : new Date().toISOString(),
                ...(title && { title: title, slug: createSlug(title, true) }),
                ...(tags && { tags: tags })
            })
        });

        if (response.status === 403) {
            return new NextResponse("Forbidden", { status: 403 })
        } else if (response.status === 200) {
            return new NextResponse("Success", { status: 200 })
        } else {
            return new NextResponse("Unexpected error", { status: 500 })
        }
    } catch (e) {
        console.error(e)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}