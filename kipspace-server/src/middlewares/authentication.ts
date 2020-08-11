import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@config';
import { IUser } from '@models/User.model';
import { getOneUser } from '@controllers/user.controller';
import { getOneAdmin } from '@controllers/admin.controller';
import { IAdmin } from '@models/Admin.model';

export default async (token: string, forAdmin?: boolean): Promise<IUser | IAdmin> => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET);

		const user = forAdmin
			? await getOneUser({ email: (decoded as IUser).email })
			: await getOneAdmin({ email: (decoded as IAdmin).email });

		if (!user) {
			return Promise.reject(new Error('auth failed/no user'));
		}

		if (user && user.token !== (decoded as IUser | IAdmin).token) {
			return Promise.reject(new Error('auth failed/invalid token'));
		}

		return user;
	} catch (error) {
		return Promise.reject(error);
	}
};
