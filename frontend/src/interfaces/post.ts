import { IImage } from "./image";
import { ITag } from "./tag";
import { IUser } from "./user";

export interface IPost {
  id: number;
  title: string;
  description: string;
  author: IUser;
  slug: string;
  tags: ITag[];
  images: IImage[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
