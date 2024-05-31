import { IProfileComment } from "./comment";
import { Format } from "./image";
import { IPost } from "./post";

export interface IUser {
  id: number;
  username: string;
  email: string;
  slug: string;
  confirmed: boolean;
  blocked: boolean;
  posts: IPost[];
  createdAt: string;
  updatedAt: string;
  avatar: Avatar;
  profile_comments: IProfileComment[];
  about: string;
  followings: IUser[];
  followers: IUser[];
}

type Avatar = {
  id: 4;
  name: string;
  alternativeText: string;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: Format
    small: Format
    large: Format
    medium: Format
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
}

