import { User, IUser } from '@models/User.model';

// user projection
export type Projection = { [field in keyof User]?: number };

export type UserQuery = { [field in keyof IUser]?: IUser[field] };

// create-user controller
export type CreateUserParam = {
	email: IUser['email'];
	hash: IUser['hash'];
};

export type CreateUser = (param: CreateUserParam) => Promise<IUser>;

// get-user controller
export type GetOneUser = (
	query: UserQuery,
	projection?: Projection
) => Promise<IUser | null>;

export type GetMultipleUser = (
	query?: UserQuery,
	projection?: Projection
) => Promise<IUser[]>;

// update-user controller
export type UpdateOneUser = (query: UserQuery, fields: UserQuery) => Promise<void>;
