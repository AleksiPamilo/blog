"use server";

import BlogCard from "@/components/BlogCard";
import { IPost } from "@/interfaces/post";

export async function getPosts() {
  const strapiUrl = process.env.STRAPI_URL;
  const res = await fetch(`${strapiUrl}/api/posts?populate=author`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  });

  return await res.json();
}

export default async function Home() {
  const {
    data,
    meta,
    error,
  }: {
    data: {
      id: number;
      attributes: IPost;
    }[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
    error: Error | any;
  } = await getPosts();

  return (
    <main className="">
      <div className="flex flex-wrap gap-4 w-full items-center justify-center">
        {data.map((data) => (
          <BlogCard post={data.attributes} key={data.id} />
        ))}
      </div>
    </main>
  );
}
