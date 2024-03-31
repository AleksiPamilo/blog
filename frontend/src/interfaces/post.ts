import { IUser } from "./user";

export interface IPost {
  title: string;
  description: string;
  author: {
    id: number;
    data: { attributes: IUser };
  };
  slug: string;
  images: File[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
