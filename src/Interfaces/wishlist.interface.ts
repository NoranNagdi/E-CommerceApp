import { IBrand } from "./brand.interface";
import { ICategory } from "./category.interface";
import { ISubcategory } from "./subcategory.interface";

export interface IWishlistResponse {
  status: string;
  count: number;
  data: IWishList[];
}

export interface IWishList {
  sold: number;
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
  __v: number;
  id: string;
}
