import { getOneCategory } from '@controllers/category.controller';
import { updateCategory } from '@controllers/category.controller/update-category';
import { Exception } from '@shared/functions';
import { NOT_FOUND } from 'http-status-codes';

export const UpdateCategoryIcon = async (_id: string, imageUrl: string) => {
	try {
		const category = await getOneCategory({ _id });

		if (!category) throw new Exception(NOT_FOUND, 'Category not found or supported');

		await updateCategory({ _id }, { icon: imageUrl });

		return category;
	} catch (error) {
		return Promise.reject(error);
	}
};
