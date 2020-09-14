import { UpdateOneUser } from './types';
import User from '@models/User.model';

export const updateUser: UpdateOneUser = async (query, fields) => {
	try {
		await User.updateOne(query, fields);
	} catch (error) {
		Promise.reject(error);
	}
};
