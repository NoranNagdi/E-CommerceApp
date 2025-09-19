import { IMetadata } from "./metadata.inteface";

export interface ICategoryResponse {
  results: number;
  metadata: IMetadata;
  data: ICategory[];
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
