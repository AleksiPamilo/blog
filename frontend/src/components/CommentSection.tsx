"use client";

import { SendHorizontal } from "lucide-react";
import Input from "./Input";
import Comment from "./Comment";
import { IPost, IComment } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import Loading from "./Loading";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function CommentSection({ post }: { post: IPost }) {
    const limit = 5;
    const [comments, setComments] = useState<IComment[]>([]);
    const [totalComments, setTotalComments] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const fetchComments = useCallback(() => {
        return fetch(`${apiUrl}/api/comments?slug=${post.slug}&limit=${limit}&start=${offset}`)
            .then((res) => res.json());
    }, [post.slug, limit, offset]);

    useEffect(() => {
        fetchComments()
            .then(data => {
                setComments(data?.data);
                setTotalComments(parseInt(data?.meta?.pagination?.total));
                setOffset(data?.data.length);
            })
            .catch(() => {
                setComments([]);
                setOffset(0);
            })
            .finally(() => {
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadMoreComments = useCallback(() => {
        setLoading(true);

        fetchComments()
            .then(data => {
                setComments(prevComments => [...prevComments, ...data?.data]);
                setOffset(prevOffset => prevOffset + limit);
            })
            .catch(() => {
                setError("Failed to fetch more comments");
            })
            .finally(() => setLoading(false));
    }, [fetchComments]);

    return (
        <div className="flex flex-col w-full h-full gap-4 mt-12">
            <h1 className="text-2xl font-semibold">{totalComments} Comments</h1>

            <div>
                <div className="relative">
                    <Input placeholder="What do you think?" />
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
            {totalComments > comments.length && !loading && (
                <Button variant="outline" onClick={loadMoreComments}>Show More</Button>
            )}
        </div>
    );
}
