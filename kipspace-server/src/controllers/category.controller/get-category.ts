import Category from '@models/Category.model';
import { GetMultipleCategory, GetOneCategory, Projection } from './types';

const defaultProjection: Projection = {};

export const getMultipleCategory: GetMultipleCategory = async (query, projection) => {
	try {
		const category = await Category.find(query || {}, { ...defaultProjection, ...(projection || {}) });

		return category;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getOneCategory: GetOneCategory = async (query, projection) => {
	try {
		const category = await Category.findOne(query, { ...defaultProjection, ...(projection || {}) });

		return category;
	} catch (error) {
		return Promise.reject(error);
	}
};
