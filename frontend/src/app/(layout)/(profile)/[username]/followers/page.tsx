"use client";

import ErrorDisplay from "@/components/ErrorDisplay";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import UserCard from "@/components/UserCard";
import { Button } from "@/components/ui/button";
import { IUser } from "@/interfaces";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Followers() {
    const [followers, setFollowers] = useState<IUser[] | null>([]);
    const [followings, setFollowings] = useState<IUser[] | null>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const pathname = usePathname();
    const router = useRouter();

    const fetchData = useCallback(() => {
        if (!pathname.split("/")[1].startsWith("@")) return;

        setError(null);
        setLoading(true);
        const slug = pathname.split("/")[1];

        fetch(
            `${apiUrl}/users?slug=${slug}&populate=followers,followers.avatar,about`,
        )
            .then(async (data) => {
                if (!data.ok) {
                    throw new Error("Failed to fetch data");
                }

                const json = await data.json();
                const userData = json?.data?.[0];

                if (!userData) setFollowers(null);
                setFollowers(userData.followers);

                fetch(`${apiUrl}/auth/me`)
                    .then(async (res) => {
                        const json = await res.json();
                        setFollowings(json.user.followings);
                    }).catch(() => setFollowings(null));
            })
            .catch(() => {
                setFollowers([]);
                setError("Failed to fetch data. Please try again later.");
            })
            .finally(() => setLoading(false));
    }, [pathname]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    if (error) {
        return <ErrorDisplay error={error} onRetry={fetchData} />;
    }

    if (loading) {
        return <Loading />;
    }

    if (followers === null) {
        return <NotFound />;
    }

    return (
        <div className="w-full flex flex-col mt-28 gap-10 items-center justify-center">
            <div className="w-4/5 flex flex-col gap-6">
                <h1 className="text-4xl font-semibold">Followers</h1>

                <Button
                    variant="link"
                    className="w-min p-0"
                    onClick={() => router.back()}>
                    Go back
                </Button>

                <div className="flex flex-col gap-2">
                    {followers.length > 0 ? followers.map((follower) => (
                        <UserCard key={follower.id} user={follower} isFollowing={followings?.some(user => user.id === follower.id) ?? false} />
                    )) : (
                        <div className="flex flex-col self-start">
                            <span>No followers</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}