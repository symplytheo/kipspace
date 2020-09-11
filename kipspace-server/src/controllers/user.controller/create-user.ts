import User, { IUser } from '@models/User.model';
import { CreateUser } from './types';

export const createUser: CreateUser = async ({ email, hash }) => {
	try {
		const user: IUser = new User({
			email: email.toLowerCase(),
			hash,
		});

		await user.save();

		return user;
	} catch (error) {
		return Promise.reject(error);
	}
};
