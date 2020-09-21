import jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from 'http-status-codes';

import { IUser } from '@models/User.model';
import { getOneUser } from '@controllers/user.controller';
import { JWT_SECRET } from '@config';
import { Exception } from '@shared/functions';

export default async (token: string): Promise<IUser> => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET);

		const user = await getOneUser({ email: (decoded as IUser).email });

		if (!user) throw new Exception(UNAUTHORIZED, 'auth failed/no user');

		// if (user && user.token !== (decoded as IUser).token) {
		// 	return Promise.reject(new Error('auth failed/invalid token'));
		// }

		return user;
	} catch (error) {
		return Promise.reject(error);
	}
};
