"use server";

import BlogCard from "@/components/BlogCard";
import { IPost } from "@/interfaces/post";

export async function getPosts() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const res = await fetch(
    `${strapiUrl}/api/posts?populate[0]=author&populate[1]=tags&populate[2]=images`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

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
    <main className="flex flex-col gap-2">
      <h1 className="px-6 font-semibold">Popular posts:</h1>
      <div className="grid grid-cols-3 px-6 gap-4 w-full items-center justify-center">
        {data.map((data) => (
          <div className="max-w-[35rem]" key={data.id}>
            <BlogCard post={data.attributes} />
          </div>
        ))}
      </div>
    </main>
  );
}
