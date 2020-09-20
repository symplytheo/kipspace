import { UpdateOneCategory } from './types';
import Category from '@models/Category.model';

export const updateCategory: UpdateOneCategory = async (query, fields) => {
	try {
		await Category.updateOne(query, fields);
	} catch (error) {
		Promise.reject(error);
	}
};
