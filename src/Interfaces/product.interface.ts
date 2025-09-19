import { IBrand } from "./brand.interface";
import { ICategory } from "./category.interface";
import { IMetadata } from "./metadata.inteface";
import { ISubcategory } from "./subcategory.interface";

export interface IProductResponse {
  results: number;
  metadata: IMetadata;
  data: IProduct[];
}

export interface IProduct {
  sold?: number;
  images: string[];
  subcategory: ISubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: ICategory;
  brand: IBrand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: string[];
}
