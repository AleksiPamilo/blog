import { IPost } from "./post";
import { IUser } from "./user";

export interface IComment {
    id: number;
    author: IUser;
    post: IPost;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface IProfileComment {
    id: number;
    author: IUser;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}