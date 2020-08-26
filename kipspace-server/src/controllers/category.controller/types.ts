import { Category, ICategory } from '@models/Category.model';

// user projection
export type Projection = { [field in keyof Category]?: number };

// create-user controller
export type CreateCategoryParam = {
	name: ICategory['name'];
	description?: ICategory['description'];
	icon?: ICategory['icon'];
};
export type CreateCategory = (param: CreateCategoryParam) => Promise<ICategory>;

// get-user controller
export type GetCategoryQuery = { [field in keyof ICategory]?: ICategory[field] };
export type GetOneCategory = (query: GetCategoryQuery, projection?: Projection) => Promise<ICategory | null>;
export type GetMultipleCategory = (query?: GetCategoryQuery, projection?: Projection) => Promise<ICategory[]>;
