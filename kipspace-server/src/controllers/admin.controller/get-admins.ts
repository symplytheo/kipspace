import Admin from '@models/Admin.model';
import { GetMultipleAdmin, Projection, GetOneAdmin } from './types';

const defaultProjection: Projection = {
	token: 0,
	hash: 0,
};

export const getOneAdmin: GetOneAdmin = async (query, projection) => {
	try {
		const admin = await Admin.findOne(query, { ...defaultProjection, ...(projection || {}) });

		return admin;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getMultipleAdmin: GetMultipleAdmin = async (query, projection) => {
	try {
		const admin = await Admin.find(query || {}, { ...defaultProjection, ...(projection || {}) });

		return admin;
	} catch (error) {
		return Promise.reject(error);
	}
};
