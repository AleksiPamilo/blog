"use client";

import { IPost, IUser } from "@/interfaces";
import { timeAgo } from "@/utils/formatTime";
import Link from "next/link";

export default function ProfileBlogCard({ user, post }: { user: IUser, post: IPost }) {
    return (
        <Link href={`/${user.slug}/${post.slug}`} className="w-full p-4 shadow-md  border border-zinc-200 hover:border-zinc-300 rounded-md hover:scale-105 transition-all duration-500">
            <div className="flex flex-col md:flex-row mb-2 md:items-center md:justify-between">
                <h1 className="font-semibold">{post.title}</h1>
                <p>{timeAgo(post.publishedAt)}</p>
            </div>
            <p className="line-clamp-3 md:line-clamp-2">{post.description.replace(/<[^>]*>?/gm, '')}</p>
        </Link>
    )
}