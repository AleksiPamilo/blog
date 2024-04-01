"use server";

import BlogCard from "@/components/BlogCard";
import { IUser } from "@/interfaces/user";
import { formatTime } from "@/utils/formatTime";
import { headers } from "next/headers";

export async function getUser() {
  const headersList = headers();
  const headerUrl = headersList.get("next-url" || "")?.replace("/%40", "@");
  const strapiUrl = process.env.STRAPI_URL;

  const res = await fetch(
    `${strapiUrl}/api/users?filters[slug]=${headerUrl}&populate=posts`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

  const json = await res.json();
  return json[0];
}

export default async function Profile() {
  const user: IUser = await getUser();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <div className="grid grid-cols-3 p-4 rounded-md w-4/5 bg-zinc-100 shadow-md">
        <div className="col-span-2">{user.username}</div>
        <div className="text-right">
          User created: {formatTime(user.createdAt)}
        </div>
      </div>
      <div className="w-4/5 flex flex-col gap-3">
        <h1>User's blog posts:</h1>
        {user.posts.map((post) => (
          <BlogCard post={post} author={user} key={post.slug} />
        ))}
      </div>
    </div>
  );
}
