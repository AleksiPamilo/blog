"use client";

import BlogCard from "@/components/BlogCard";
import { IPost } from "@/interfaces/post";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [posts, setPosts] = useState<IPost[] | null>(null);

  useEffect(() => {
    fetch(apiUrl + "/api/posts?populate=author,images,tags&limit=3&sort=true").then(async (data) => {
      const json = await data.json();
      setPosts(json.data);
    })
  }, []);

  return (
    <main className="flex flex-col w-full gap-2">
      {posts &&
        <>
          <h1 className="px-6 font-semibold">Popular posts:</h1>
          <div className="flex flex-wrap px-6 gap-4 w-full items-center justify-center">
            {posts.map((post) => (
              <div key={post.id}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </>
      }
    </main>
  );
}
