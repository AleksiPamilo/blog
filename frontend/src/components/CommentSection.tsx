"use client";

import { SendHorizontal } from "lucide-react";
import Input from "./Input";
import Comment from "./Comment";
import { IPost, IComment } from "@/interfaces";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function CommentSection({ post }: { post: IPost }) {
    const limit = 5;
    const [comments, setComments] = useState<IComment[]>([]);
    const [totalComments, setTotalComments] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(limit);

    useEffect(() => {
        fetchComments().then(async (res) => {
            const data = await res.json();
            setComments(data.data);
            setTotalComments(parseInt(data.meta.pagination.total));
        }).catch(() => setComments([]));
    }, []);

    const fetchComments = async () => {
        return fetch(`${apiUrl}/api/comments?slug=${post.slug}&limit=${limit}&start=${offset}`);
    };

    const loadMoreComments = async () => {
        setLoading(true);
        try {
            const response = await fetchComments();
            const data = await response.json();
            setComments(prevComments => [...prevComments, ...data.data]);
            setOffset(prevOffset => prevOffset + limit);
        } catch (error) {
            console.error('Error fetching more comments:', error);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col w-full h-full gap-4 mt-12">
            <h1 className="text-2xl font-semibold">{totalComments} Comments</h1>

            <div>
                <div className="relative">
                    <Input placeholder="What do you think?" />
                    <button onClick={() => alert("TODO")}>
                        <SendHorizontal className="text-gray-600 mx-3 absolute right-0 top-1/2 transform -translate-y-1/2" />
                    </button>
                </div>
            </div>

            {comments && comments.map((comment) => (
                <Comment comment={comment} key={comment.id} />
            ))}

            {loading && <div>Loading...</div>}
            {totalComments > comments.length && !loading && (
                <button onClick={loadMoreComments}>Show More</button>
            )}
        </div>
    );
}
