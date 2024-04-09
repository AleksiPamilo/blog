"use server";

import Tiptap from "@/components/Editor/Tiptap";
import Loading from "@/components/Loading";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { IPost } from "@/interfaces/post";
import { formatTime, timeAgo } from "@/utils/formatTime";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

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
    const thumbnail = post.images?.[0];
    const avatar = author.avatar;

    return (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="max-w-[1024px] px-4">
                {
                    thumbnail &&
                    <div className="w-full min-h-[10rem] relative">
                        <Image src={strapiUrl + thumbnail.url} alt={thumbnail.alternativeText ?? "thumbnail"} className="rounded-md" fill={true} />
                    </div>
                }
                <div className="mt-4 flex max-md:flex-col max-md:gap-2 md:items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">{post.title}</h1>
                        <Tooltip>
                            <TooltipTrigger className="cursor-text">Published {timeAgo(post.publishedAt)}</TooltipTrigger>
                            <TooltipContent>
                                <p>{formatTime(post.publishedAt)}</p>
                            </TooltipContent>
                        </Tooltip>
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
                        <Link href={`/${author.slug}`} className="hover:underline">{author.username}</Link>
                    </div>
                </div>
                <div className="mt-12">
                    <Tiptap content={post.description} editable={false} />
                </div>
            </div>
        </div>
    );
}
