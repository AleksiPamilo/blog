import { IPost } from "@/interfaces";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);
        const apiUrl = `${strapiUrl}/api/users/me?populate[0]=posts&populate[1]=posts.tags`;

        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
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