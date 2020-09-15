import User from '@models/User.model';
import { GetMultipleUser, GetOneUser, Projection } from './types';

const defaultProjection: Projection = {
	token: 0,
	hash: 0,
};

export const getMultipleUser: GetMultipleUser = async (query, projection) => {
	try {
		const user = await User.find(query || {}, {
			...(projection || defaultProjection),
		});

		return user;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getOneUser: GetOneUser = async (query, projection) => {
	try {
		const user = await User.findOne(query, {
			...(projection || defaultProjection),
		});

		return user;
	} catch (error) {
		return Promise.reject(error);
	}
};
