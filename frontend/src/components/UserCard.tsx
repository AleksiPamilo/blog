import { IUser } from "@/interfaces";
import Avatar from "./Avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import FollowButton from "./FollowButton";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function UserCard({ user, isFollowing }: { user: IUser, isFollowing: boolean }) {
    return (
        <div className="relative">
            <Link href={`/${user.slug}`} className="max-w-4/5 flex py-2 px-3 items-center justify-between gap-2 bg-zinc-100 border border-zinc-200 rounded-md shadow-md hover:bg-zinc-200">
                <div className="flex items-center gap-2">
                    <Avatar image={strapiUrl + user.avatar?.url} />
                    <p>{user.username}</p>
                </div>
            </Link>
            <div className="absolute top-1/2 transform -translate-y-1/2 right-2">
                <FollowButton isFollowing={isFollowing} userId={user.id} />
            </div>
        </div>
    )
}