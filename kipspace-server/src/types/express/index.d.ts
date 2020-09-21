import { Express } from 'express-serve-static-core';
import { IUser } from '@models/User.model';

declare namespace Express {
	interface Request {
		decoded: any;
		user: IUser;
	}
}
