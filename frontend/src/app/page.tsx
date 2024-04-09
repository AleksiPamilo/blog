"use server";

import BlogCard from "@/components/BlogCard";
import { getPosts } from "@/utils/getPosts";

export default async function Home() {
  const { data } = await getPosts(3);

  return (
    <main className="flex flex-col w-full gap-2">
      {data &&
        <>
          <h1 className="px-6 font-semibold">Popular posts:</h1>
          <div className="flex flex-wrap px-6 gap-4 w-full items-center justify-center ">
            {data.map((post) => (
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
