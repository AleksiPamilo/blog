"use client";

import Editor from "@/components/Editor/Editor";
import UnAuthenticated from "@/components/UnAuthenticated";
import { Input } from "@/components/ui/input";
import { Errors } from "@/interfaces";
import createSlug from "@/utils/createSlug";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { toast } from "sonner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface SubmitOptions {
    html: string;
    text: string;
    draft: boolean;
};

export default function CreatePost() {
    const { status } = useSession();
    const titleRef = useRef<HTMLInputElement>(null);

    const submit = (options?: Partial<SubmitOptions>): void => {
        const { html, text, draft } = options || {};

        if (!titleRef?.current?.value || !html || !text) {
            toast.error(Errors.Common.EmptyFields);
            return;
        }

        if (text.length < 50) {
            toast.error(Errors.Common.ShortContent + " (Content should be atleast 50 characters long!)");
            return;
        }

        fetch(apiUrl + "/posts", {
            method: "POST",
            body: JSON.stringify({
                title: titleRef.current.value,
                description: String(html),
                slug: createSlug(titleRef.current.value, true),
                draft: draft,
            })
        }).then(res => {
            switch (res.status) {
                case 200:
                    toast.success("Post created successfully!");
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
        })
    }

    return (
        status === "authenticated" ?
            <div className="flex flex-col items-center justify-center pb-16">
                <div className="max-w-[1024px] w-full mt-4 flex max-md:flex-col max-md:gap-2 md:items-center justify-between">
                    <div className="mt-12 px-2 w-full flex flex-col gap-4 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto">
                        <Input placeholder="Blog title..." className="shadow-md" ref={titleRef} />
                        <Editor submit={submit} />
                    </div>
                </div>
            </div>
            : <UnAuthenticated />
    );
}