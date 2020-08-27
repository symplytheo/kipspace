import Category, { ICategory } from '@models/Category.model';
import { CreateCategory } from './types';

export const createCategory: CreateCategory = async ({ name, description, icon }) => {
	try {
		const category: ICategory = new Category({
			name: name.trim().toLowerCase(),
			description: description?.trim(),
			icon,
		});

		await category.save();

		return category;
	} catch (error) {
		return Promise.reject(error);
	}
};
