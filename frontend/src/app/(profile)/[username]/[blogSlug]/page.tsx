"use server";

import Tiptap from "@/components/Editor/Tiptap";
import Loading from "@/components/Loading";
import { IPost } from "@/interfaces/post";
import { formatDDMMYYYY } from "@/utils/formatTime";
import { headers } from "next/headers";
import Image from "next/image";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getPost() {
    const headersList = headers();
    const headerUrl = headersList.get("next-url" || "")?.replace("/%40", "@");
    const blogSlug = headerUrl?.split("/")[1];
    const res = await fetch(
        `${strapiUrl}/api/posts?filters[slug]=${blogSlug}&populate=[0]=author&populate[1]=images&populate[2]=tags&populate[3]=author.avatar`,
        {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
        }
    );

    const json = await res.json();
    return json?.data[0];
}

export default async function Post() {
    const post: IPost | undefined | null = await getPost();
    if (!post) return <Loading />;

    const author = post.author;
    const thumbnail = post.images[0]
    const avatar = author.avatar;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-4/5">
                <div className="w-full min-h-[10rem] relative">
                    <Image src={strapiUrl + thumbnail.url} alt={thumbnail.alternativeText ?? "thumbnail"} className="rounded-md" fill={true} />
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">{post.title}</h1>
                        <h2>{formatDDMMYYYY(post.publishedAt)}</h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative w-10 h-10">
                            <Image
                                className="rounded-full bg-zinc-100 shadow-md border"
                                src={strapiUrl + avatar.url}
                                alt={avatar.alternativeText ?? "avatar"}
                                fill={true}
                            />
                        </div>
                        <span>{author.username}</span>
                    </div>

                </div>
                <div className="mt-12">
                    <Tiptap content={post.description} />
                </div>
            </div>
        </div>
    );
}
