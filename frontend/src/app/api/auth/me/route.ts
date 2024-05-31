import { IPost } from "@/interfaces";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);
        const blogSlug = req.nextUrl.searchParams.get("blogSlug");
        const apiUrl = `${strapiUrl}/api/users/me?populate[0]=posts&populate[1]=posts.images&populate[2]=posts.tags&populate[3]=avatar&populate[4]=followings`;

        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!!blogSlug) {
            const fetchRes = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${session.jwt}`,
                },
            });

            const data = await fetchRes.json();
            const draft = data?.posts?.find((post: IPost) => post.slug === blogSlug);

            if (draft) {
                return new NextResponse(JSON.stringify({
                    user: data,
                    draft: draft,
                }), { status: 200 });
            } else {
                return new NextResponse("Data Not Found", { status: fetchRes.status });
            }
        }

        const fetchRes = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${session.jwt}`,
            },
        });

        const data = await fetchRes.json();
        const draftPosts = await data?.posts?.filter((post: IPost) => post.publishedAt === null) ?? null;

        return new NextResponse(JSON.stringify({
            user: data,
            drafts: draftPosts,
        }), { status: 200 });
    } catch (err) {
        console.error(err)
        return new NextResponse("Internal server error", { status: 500 })
    }
}