import { IComment } from "@/interfaces";
import { timeAgo } from "@/utils/formatTime";
import Link from "next/link";
import { useAuth } from "./context/AuthProvider";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function Comment({ comment }: {
    comment: IComment
}) {
    const { user } = useAuth();
    const isRight = user?.username === comment.author.username;
    const avatar = comment.author.avatar;

    return (
        <div className={`flex flex-col gap-4 md:gap-2 w-11/12 bg-zinc-100 border border-zinc-200 p-3 relative rounded-xl ${isRight && "self-end"}`}>
            <div className="flex max-md:gap-2 max-md:flex-col md:items-center justify-between ">
                <div className="flex gap-2 items-center">
                    <img className="w-10 h-10 rounded-full" src={strapiUrl + avatar.url} alt={avatar.alternativeText ?? "avatar"} />
                    <Link href={`/${comment.author.slug}`} className="hover:underline font-semibold">{comment.author.username}</Link>
                </div>
                <span>{timeAgo(comment.publishedAt)}</span>
            </div>
            {comment.content}
        </div>
    )
}
