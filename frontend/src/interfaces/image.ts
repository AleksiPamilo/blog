export interface IImage {
  id: number;
  alternativeText: string | null;
  caption: string | null;
  createdAt: string;
  ext: string;
  formats: {
    large: Format;
    medium: Format;
    small: Format;
    thumbnail: Format;
  };
  hash: string;
  height: number;
  mime: string;
  name: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
}

export type Format = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
};
