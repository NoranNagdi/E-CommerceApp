import { IMetadata } from "./metadata.inteface";

export interface ISubcategoryResponse {
  results: number;
  metadata: IMetadata;
  data: ISubcategory[];
}

export interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
