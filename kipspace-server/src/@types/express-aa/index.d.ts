import 'express-serve-static-core';
import { IUser } from '@models/User.model';

declare module 'express-serve-static-core' {
	export interface Request {
		decoded?: IUser;
		user?: IUser;
	}
}
