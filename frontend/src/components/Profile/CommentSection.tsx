"use client";

import { SendHorizontal } from "lucide-react";
import Input from "../Input";
import Comment from "../Comment";
import { IComment, IUser } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Loading from "../Loading";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Pagination from "./Pagination";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ProfileCommentSection({ user }: { user: IUser }) {
    const limit = 5;
    const [comments, setComments] = useState<IComment[]>([]);
    const [totalComments, setTotalComments] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const fetchComments = useCallback(async (page: number) => {
        const start = (page - 1) * limit;
        const res = await fetch(`${apiUrl}/api/profile-comments?slug=${user.slug}&limit=${limit}&start=${start}`);
        return await res.json();
    }, [user.slug, limit]);

    const loadComments = useCallback((page: number) => {
        setLoading(true);
        fetchComments(page)
            .then(data => {
                setComments(data?.data);
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

    return (
        <div className="flex flex-col w-full h-full gap-4">
            <h1 className="text-2xl font-semibold">{totalComments} Comments</h1>

            <div>
                <div className="relative">
                    <Input placeholder="Add a comment!" />
                    <Button variant="ghost" onClick={() => alert("TODO")} className="text-gray-600 p-0 mx-3 absolute right-0 top-1/2 transform -translate-y-1/2">
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

            {error &&
                <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                        <button onClick={() => setError(null)} className="w-full p-2 bg-red-300 border border-red-500 rounded-md shadow-md text-center">{error}</button>
                    </TooltipTrigger>
                    <TooltipContent className="px-4 py-2">
                        Hide error
                    </TooltipContent>
                </Tooltip>
            }

            {totalComments > limit && (
                <Pagination totalComments={totalComments} currentPage={currentPage} onPageChange={loadComments} />
            )}
        </div>
    );
}
