"use client";

import { SendHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import Comment from "../Comment";
import { Errors, IComment, IUser } from "@/interfaces";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Loading from "../Loading";
import Pagination from "./Pagination";
import { toast } from "sonner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ProfileCommentSection({ user }: { user: IUser }) {
    const limit = 5;
    const [comments, setComments] = useState<IComment[]>([]);
    const [totalComments, setTotalComments] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const commentRef = useRef<HTMLInputElement>(null);

    const fetchComments = useCallback(async (page: number) => {
        const start = (page - 1) * limit;
        const res = await fetch(`${apiUrl}/api/profile-comments?slug=${user.slug}&limit=${limit}&start=${start}`);
        return await res.json();
    }, [user.slug, limit]);

    const loadComments = useCallback((page: number) => {
        setLoading(true);
        fetchComments(page)
            .then(data => {
                setComments(data?.data ?? []);
                setTotalComments(parseInt(data?.meta?.pagination?.total));
                setCurrentPage(page);
            })
            .catch(() => {
                setComments([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [fetchComments]);

    useEffect(() => {
        loadComments(1);
    }, [loadComments]);

    const submit = () => {
        if (!commentRef?.current?.value) {
            return toast.error(Errors.Common.EmptyComment);
        }

        if (commentRef.current.value.length < 5) {
            return toast.error(Errors.Common.ShortContent);
        }

        fetch(process.env.NEXT_PUBLIC_API_URL + "/api/profile-comments", {
            method: "POST",
            body: JSON.stringify({
                content: String(commentRef.current.value),
                commentedOn: user.id
            })
        }).then(async (res) => {
            switch (res.status) {
                case 200:
                    const { comment } = await res.json();

                    if (commentRef && commentRef.current) {
                        commentRef.current.value = "";
                    }

                    setComments(prev => [comment, ...prev])
                    toast.success("Comment sent successfully!");
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
        <div className="flex flex-col w-full h-full gap-4">
            <h1 className="text-2xl font-semibold">{totalComments} Comments</h1>

            <div>
                <div className="relative">
                    <Input placeholder="Add a comment!" ref={commentRef} className="bg-zinc-100 p-4 h-max rounded-lg border border-zinc-200 focus:border-zinc-400" />
                    <Button variant="ghost" onClick={submit} className="text-gray-600 p-0 mx-3 absolute right-0 top-1/2 transform -translate-y-1/2">
                        <SendHorizontal />
                    </Button>
                </div>
            </div>

            {comments.length > 0 && comments.map((comment) => (
                <Comment comment={comment} key={comment.id + Math.floor(Math.random() * Date.now())} />
            ))}

            <div className="relative mt-4" hidden={!loading}>
                <Loading />
            </div>

            {totalComments > limit && (
                <Pagination totalComments={totalComments} currentPage={currentPage} onPageChange={loadComments} />
            )}
        </div>
    );
}
