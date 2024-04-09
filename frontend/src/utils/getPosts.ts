"use server";

import { IPost } from "@/interfaces/post";

export async function getPosts(limit?: number): Promise<{
    data: IPost[];
}> {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const res = await fetch(
        `${strapiUrl}/api/posts?populate[0]=author&populate[1]=tags&populate[2]=images${limit && "&pagination[limit]=" + limit}&sort[0]=createdAt:desc`,
        {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
        }
    );

    return await res.json();
}