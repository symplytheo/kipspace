import Bcrypt from 'bcrypt';

import { NOT_FOUND, FORBIDDEN } from 'http-status-codes';

import { IUser } from '@models/User.model';
import { getOneUser } from '@controllers/user.controller';
import { Exception } from '@shared/functions';

export const CheckUserPassword = async (
	email: string,
	password: string
): Promise<IUser> => {
	try {
		const user = await getOneUser({ email }, {});

		if (!user) throw new Exception(NOT_FOUND, 'User not found.');

		const match = await Bcrypt.compare(password, user.hash);

		if (!match) throw new Exception(FORBIDDEN, 'Invalid Password');
		else
			return {
				_id: user._id,
				email: user.email,
				role: user.role,
			} as IUser;
	} catch (error) {
		return Promise.reject(error);
	}
};
