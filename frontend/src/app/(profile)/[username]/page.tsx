"use client";

import CommentSection from "@/components/CommentSection";
import ErrorDisplay from "@/components/ErrorDisplay";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import ProfileBlogCard from "@/components/Profile/BlogCard";
import { Button } from "@/components/ui/button";
import { Errors, IPost, IUser } from "@/interfaces";
import { LoaderCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Profile() {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<{ page: boolean; button: boolean }>({
    page: true,
    button: false,
  });
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const pathname = usePathname();

  const fetchData = useCallback(() => {
    if (!pathname.split("/")[1].startsWith("@")) return;

    setError(null);
    setLoading((prev) => ({ ...prev, page: true }));
    const slug = pathname.split("/")[1];

    fetch(
      `${apiUrl}/users?slug=${slug}&populate=posts,posts.tags,posts.images,profile_comments,profile_comments.author,profile_comments.author.avatar,followers&filters=drafts`
    )
      .then(async (data) => {
        if (!data.ok) {
          throw new Error("Failed to fetch data");
        }

        const json = await data.json();
        const userData = json?.data?.[0];

        if (!userData) {
          setError("Unexpected error occurred");
        } else {
          const filteredPosts = userData.posts.filter(
            (post: IPost) => post.publishedAt !== null
          );

          const updatedUserData = {
            ...userData,
            posts: filteredPosts,
          };

          setUser(updatedUserData);

          try {
            const res = await fetch(
              "/api/users/follow-status?id=" + updatedUserData.id
            );
            const json = await res.json();
            setIsFollowing(json.isFollowing);
          } catch {
            setIsFollowing(false);
          }
        }
      })
      .catch(() => {
        setUser(null);
        setError("Failed to fetch data. Please try again later.");
      })
      .finally(() => setLoading((prev) => ({ ...prev, page: false })));
  }, [pathname]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFetchData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  if (!pathname.split("/")[1].startsWith("@")) {
    return <NotFound />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={handleFetchData} />;
  }

  if (loading.page) {
    return <Loading />;
  }

  if (!user) {
    return <NotFound />;
  }

  document.title = user.username + "'s Profile";

  const sortedPosts = user.posts
    .sort((a, b) => {
      return (
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    })
    .reverse();

  return (
    <div className="w-full flex flex-col mt-28 gap-10 items-center justify-center">
      <div className="w-4/5 flex gap-2 items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold">{user.username}</h1>
          <button
            onClick={() => alert("Todo Follower Logic")}
            className="text-md hover:underline"
          >
            Followers: {user.followers.length}
          </button>
        </div>
        <div>
          <Button
            disabled={loading.button}
            onClick={() => {
              setLoading((prev) => ({ ...prev, button: true }));
              fetch(`/api/users/${isFollowing ? "unfollow" : "follow"}`, {
                method: "POST",
                body: JSON.stringify({
                  id: user.id,
                }),
              })
                .then((res) => {
                  if (res.status === 200) {
                    setIsFollowing(!isFollowing);
                  } else {
                    toast.error(Errors.Common.Unexpected);
                  }
                })
                .catch(() => toast.error(Errors.Common.Unexpected))
                .finally(() =>
                  setLoading((prev) => ({ ...prev, button: false }))
                );
            }}
          >
            {loading.button ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </>
            ) : isFollowing ? (
              "Unfollow"
            ) : (
              "Follow"
            )}
          </Button>
        </div>
      </div>
      <div className="w-4/5 flex flex-col gap-3">
        {sortedPosts.map((post) => (
          <ProfileBlogCard user={user} post={post} key={post.slug} />
        ))}
      </div>
      <div className="w-4/5 border border-zinc-200 p-4 mb-8 rounded-md shadow-md">
        <CommentSection data={user} />
      </div>
    </div>
  );
}
