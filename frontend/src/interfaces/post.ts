import { IImage } from "./image";
import { ITag } from "./tag";
import { IUser } from "./user";

export interface IPost {
  title: string;
  description: string;
  author: {
    id: number;
    data: { attributes: IUser };
  };
  slug: string;
  tags: {
    id: number;
    data: ITag[];
  };
  images: {
    id: number;
    data: IImage[];
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
