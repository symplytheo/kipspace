import User from '@models/User.model';
import { GetMultipleUser, GetOneUser, Projection } from './types';

const defaultProjection: Projection = {
	token: 0,
	hash: 0,
	FB_userId: 0,
	GG_userId: 0,
	TW_userId: 0,
};

export const getMultipleUser: GetMultipleUser = async (query, projection) => {
	try {
		const user = await User.find(query || {}, { ...defaultProjection, ...(projection || {}) });

		return user;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getOneUser: GetOneUser = async (query, projection) => {
	try {
		const user = await User.findOne(query, { ...defaultProjection, ...(projection || {}) });

		return user;
	} catch (error) {
		return Promise.reject(error);
	}
};
