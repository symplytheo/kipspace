import { Request } from 'express-serve-static-core';
import { IUser } from '@models/User.model';

declare module 'express-serve-static-core' {
	export interface Request extends Request {
		decoded: IUser | null;
		user: IUser;
	}
}
