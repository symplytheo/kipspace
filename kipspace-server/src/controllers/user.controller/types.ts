import { User, IUser } from '@models/User.model';

// user projection
export type Projection = { [field in keyof User]?: number };

// create-user controller
export type CreateUserParam = {
	firstname: IUser['firstname'];
	lastname: IUser['lastname'];
	email: IUser['email'];
	hash: IUser['hash'];
};
export type CreateUser = (param: CreateUserParam) => Promise<IUser>;

// get-user controller
export type GetUserQuery = { [field in keyof IUser]?: IUser[field] };
export type GetOneUser = (query: GetUserQuery, projection?: Projection) => Promise<IUser | null>;
export type GetMultipleUser = (query?: GetUserQuery, projection?: Projection) => Promise<IUser[]>;
