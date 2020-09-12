import { CategoryTC } from '@models/Category.model';

export const CategoryQuery = {
	getOneCategory: CategoryTC.getResolver('findOne'),
	getCategories: CategoryTC.getResolver('findMany'),
	paginateCategories: CategoryTC.getResolver('pagination'),
};
