"use client";

import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import Radio from "@/components/Radio";
import UnAuthenticated from "@/components/UnAuthenticated";
import { IPost, IUser } from "@/interfaces";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Drafts() {
  const { data: session } = useSession();
  const [user, setUser] = useState<IUser>();
  const [drafts, setDrafts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(apiUrl + "/auth/me")
      .then(async (res) => {
        const json = await res.json();
        setUser(json.user);
        sortDrafts("newest", json.drafts);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const sortDrafts = (sort?: string, data: IPost[] = drafts) => {
    let sortedDrafts: IPost[] = [...data];

    switch (sort) {
      case "newest":
        sortedDrafts = sortedDrafts
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        break;
      case "oldest":
        sortedDrafts = sortedDrafts
          .slice()
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        break;
      default:
        sortedDrafts = sortedDrafts
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        break;
    }

    setDrafts(sortedDrafts);
  };

  return !session?.user ? (
    <UnAuthenticated />
  ) : loading ? (
    <Loading />
  ) : (
    <div className="flex flex-col w-full gap-2 py-10">
      <div className="flex flex-wrap py-8 px-6 gap-6 w-full items-center justify-center">
        <div className="flex flex-col gap-y-4 max-w-max">
          <div className="flex gap-y-2 max-md:flex-col items-center justify-between w-full">
            <h1 className="text-xl font-semibold">Drafts</h1>
            <Radio
              onChange={(value) => sortDrafts(value)}
              defaultValue="newest"
              options={[
                { label: "Newest", value: "newest" },
                { label: "Oldest", value: "oldest" },
                { label: "Hmm", value: "hmm" },
              ]}
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center justify-center">
            {drafts.map((draft) => (
              <BlogCard post={draft} author={user} draft key={draft.slug} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
