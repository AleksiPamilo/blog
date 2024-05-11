"use client";

import BlogCard from "@/components/BlogCard";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import { IPost } from "@/interfaces";
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
      <div className="flex flex-wrap py-8 px-6 gap-6 w-full items-center justify-center">
        {posts && posts.length > 0 ? posts.map((post) => (
          <BlogCard post={post} key={post.id} />
        )) : Array(3).fill(null).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}
