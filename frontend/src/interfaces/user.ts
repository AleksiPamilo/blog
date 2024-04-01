import { IPost } from "./post";

export interface IUser {
  username: string;
  email: string;
  slug: string;
  confirmed: boolean;
  blocked: boolean;
  posts: IPost[];
  createdAt: string;
  updatedAt: string;
}
