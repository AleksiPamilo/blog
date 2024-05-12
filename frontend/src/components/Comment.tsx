import { IComment } from "@/interfaces";
import { timeAgo } from "@/utils/formatTime";
import Link from "next/link";
import { IProfileComment } from "@/interfaces/comment";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function Comment({ comment }: {
    comment: IComment | IProfileComment
}) {
    const { data: session } = useSession();
    const isRight = session?.user?.name === comment.author.username;
    const avatar = comment.author.avatar;

    const isProfileComment = () => {
        return !("post" in comment);
    }

    return (
        <div className={`flex flex-col gap-4 md:gap-2 ${isProfileComment() ? "w-full" : "w-11/12"} bg-zinc-100 border border-zinc-200 p-3 relative rounded-xl ${isRight && !isProfileComment() && "self-end"}`}>
            <div className="flex max-md:gap-2 max-md:flex-col md:items-center justify-between ">
                <div className="flex gap-2 items-center">
                    <Avatar user={comment.author} image={strapiUrl + avatar.url} />
                    <Link href={`/${comment.author.slug}`} className="hover:underline font-semibold">{comment.author.username}</Link>
                </div>
                <span>{timeAgo(comment.publishedAt)}</span>
            </div>
            {comment.content}
        </div>
    )
}
