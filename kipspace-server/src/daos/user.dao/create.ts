import Bcrypt from 'bcrypt';

import { CONFLICT } from 'http-status-codes';

import { IUser } from '@models/User.model';
import { getOneUser, updateUser, createUser } from '@controllers/user.controller';
import { Exception } from '@shared/functions';
import { SALT_ROUNDS } from '@shared/constants';

export const CreateUser = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<IUser> => {
	try {
		const hash = await Bcrypt.hash(password, SALT_ROUNDS);
		const userCheck = await getOneUser({ email });

		if (userCheck && !userCheck.is_deleted)
			throw new Exception(CONFLICT, 'User already exist');
		else if (userCheck && userCheck.is_deleted) {
			await updateUser(
				{ _id: userCheck._id },
				{ email, hash, is_active: true, is_deleted: false }
			);

			return {
				_id: userCheck._id,
				email: userCheck.email,
				role: userCheck.role,
			} as IUser;
		} else {
			const user = await createUser({ email, hash });
			return {
				_id: user._id,
				email: user.email,
				role: user.role,
			} as IUser;
		}
	} catch (error) {
		return Promise.reject(error);
	}
};
