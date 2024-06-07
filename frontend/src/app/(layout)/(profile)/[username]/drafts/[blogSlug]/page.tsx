"use client";

import { SubmitOptions } from "@/app/(layout)/create-post/page";
import Editor from "@/components/Editor/Editor";
import ErrorDisplay from "@/components/ErrorDisplay";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import UnAuthenticated from "@/components/UnAuthenticated";
import { Input } from "@/components/ui/input";
import { Errors, IPost, IUser } from "@/interfaces";
import createSlug from "@/utils/createSlug";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Draft() {
    const { status } = useSession();
    const pathname = usePathname();
    const [data, setData] = useState<{ user: IUser, draft: IPost } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const titleRef = useRef<HTMLInputElement>(null);

    const fetchData = useCallback(() => {
        setError(null);
        setLoading(true);
        const blogSlug = pathname.split("/")[3];

        fetch(`${apiUrl}/auth/me?blogSlug=${blogSlug}`)
            .then(async res => {
                if (!res.ok) {
                    return setError("Failed to fetch data");
                }

                const json = await res.json();
                setData({ user: json.user, draft: json.draft });
            })
            .catch(() => {
                setError("Failed to fetch data. Please try again later.");
            })
            .finally(() => setLoading(false));
    }, [pathname]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleFetchData = useCallback(() => {
        fetchData();
    }, [fetchData]);

    if (error) return <ErrorDisplay error={error} onRetry={handleFetchData} />;
    if (loading) return <Loading />;
    if (!data) return <NotFound />;

    const submit = (options?: Partial<SubmitOptions>): void => {
        const { html, text, draft } = options || {};

        if (text && text.length < 50) {
            toast.error(Errors.Common.ShortContent + " (Content should be atleast 50 characters long!)");
            return;
        }

        fetch(apiUrl + "/posts", {
            method: "PUT",
            body: JSON.stringify({
                id: data.draft.id,
                description: String(html),
                draft: draft,
                ...(titleRef?.current?.value && {
                    title: titleRef.current.value,
                    slug: createSlug(titleRef.current.value, true
                    )
                })
            })
        }).then(res => {
            switch (res.status) {
                case 200:
                    toast.success("Post updated successfully!");
                    break;
                case 401:
                    toast.error(Errors.Auth.Unauthorized);
                    break;
                case 403:
                    toast.error(Errors.Auth.VerifyEmail);
                    break;
                case 500:
                    toast.error(Errors.Common.InternalServerError);
                    break;
                default:
                    toast.error(Errors.Common.Unexpected);
            }
        });
    }

    return (
        status === "authenticated" ?
            <div className="flex flex-col items-center justify-center pb-16">
                <div className="max-w-[1024px] w-full mt-4 flex max-md:flex-col max-md:gap-2 md:items-center justify-between">
                    <div className="mt-12 px-2 w-full flex flex-col gap-4 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto">
                        <Input placeholder={data.draft.title} className="shadow-md" ref={titleRef} />
                        <Editor submit={submit} content={data.draft.description} />
                    </div>
                </div>
            </div>
            : <UnAuthenticated />
    );
}
