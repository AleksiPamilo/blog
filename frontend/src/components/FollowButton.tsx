"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { Errors } from "@/interfaces";
import { useSession } from "next-auth/react";

export default function FollowButton({ userId, isFollowing, onSuccess, onError }: { userId: number, isFollowing: boolean, onSuccess?: () => void, onError?: (status: number) => void }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [following, setIsFollowing] = useState<boolean>(isFollowing);
    const { data: session } = useSession();

    return (
        <Button
            disabled={userId === session?.user?.id || loading}
            onClick={() => {
                setLoading(true);
                fetch(`/api/users/${following ? "unfollow" : "follow"}`, {
                    method: "POST",
                    body: JSON.stringify({
                        id: userId,
                    }),
                })
                    .then(async (res) => {
                        if (res.status === 200) {
                            setIsFollowing(!following);
                            toast.success(await res.text());
                            onSuccess?.();
                        } else if (res.status === 400) {
                            const json = await res.json();

                            if (json?.details?.errCode === "PREVENT_SELF_FOLLOW") {
                                toast.error(json?.message);
                            }
                        } else if (res.status === 403) {
                            toast.error(await res.text());
                        } else {
                            toast.error(Errors.Common.Unexpected);
                            onError?.(500);
                        }
                    })
                    .catch(() => {
                        toast.error(Errors.Common.Unexpected);
                        onError?.(500);
                    })
                    .finally(() => setLoading(false));
            }}
        >
            {loading ? (
                <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                </>
            ) : following ? (
                "Unfollow"
            ) : (
                "Follow"
            )}
        </Button>
    )
}