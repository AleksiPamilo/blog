"use client";

import CommentSection from "@/components/CommentSection";
import Tiptap from "@/components/Editor/Tiptap";
import Loading from "@/components/Loading";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { IPost } from "@/interfaces";
import { formatTime, timeAgo } from "@/utils/formatTime";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Post() {
    const [post, setPost] = useState<IPost | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const blogSlug = pathname.split("/")[2];

        fetch(`${apiUrl}/api/posts?slug=${blogSlug}&populate=author,images,tags,author.avatar&sort=true`).then(async (data) => {
            const json = await data.json();
            const post = json?.data?.[0];
            setPost(post);
        }).catch(() => {
            setPost(null);
        });
    }, [pathname]);

    if (!post) return <Loading />;

    document.title = post.title;
    const author = post.author;
    const thumbnail = post.images?.find(x => x.caption === "thumbnail");
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
                    <Tiptap content={post.description} />
                </div>

                <CommentSection post={post} />
            </div>
        </div>
    );
}
