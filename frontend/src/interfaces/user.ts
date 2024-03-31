import { IPost } from "./post";

export interface IUser {
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  posts: IPost[];
}
