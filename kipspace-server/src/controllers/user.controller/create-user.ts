import User, { IUser } from '@models/User.model';
import { CreateUser } from './types';

export const createUser: CreateUser = async ({ firstname, lastname, email, hash }) => {
	try {
		const user: IUser = new User({
			firstname: firstname.trim(),
			lastname: lastname.trim(),
			email: email.toLowerCase(),
			hash,
		});

		await user.save();

		return user;
	} catch (error) {
		return Promise.reject(error);
	}
};
