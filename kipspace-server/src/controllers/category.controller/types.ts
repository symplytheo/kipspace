import { Category, ICategory } from '@models/Category.model';

// user projection
export type Projection = { [field in keyof Category]?: number };

export type CategoryQuery = { [field in keyof ICategory]?: ICategory[field] };

// create-user controller
export type CreateCategoryParam = {
	name: ICategory['name'];
	description?: ICategory['description'];
	icon?: ICategory['icon'];
};
export type CreateCategory = (param: CreateCategoryParam) => Promise<ICategory>;

// get-user controller
export type GetOneCategory = (
	query: CategoryQuery,
	projection?: Projection
) => Promise<ICategory | null>;

export type GetMultipleCategory = (
	query?: CategoryQuery,
	projection?: Projection
) => Promise<ICategory[]>;

// update-category controller
export type UpdateOneCategory = (
	query: CategoryQuery,
	fields: CategoryQuery
) => Promise<void>;
