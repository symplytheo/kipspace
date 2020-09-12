import { CategoryTC } from '@models/Category.model';

export const CategoryMutation = {
	createCategory: CategoryTC.getResolver('createOne'),
	updateCategory: CategoryTC.getResolver('updateOne'),
};
