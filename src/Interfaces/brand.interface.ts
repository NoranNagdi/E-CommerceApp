import { IMetadata } from "./metadata.inteface";

export interface IBrandResponse {
  results: number;
  metadata: IMetadata;
  data: IBrand[];
}

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
