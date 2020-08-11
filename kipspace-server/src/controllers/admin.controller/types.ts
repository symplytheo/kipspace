import { Admin, IAdmin } from '@models/Admin.model';

// admin projection
export type Projection = { [field in keyof Admin]?: number };

// create-admin controller
export type CreateAdminParam = {
	firstname: IAdmin['firstname'];
	lastname: IAdmin['lastname'];
	email: IAdmin['email'];
	hash: IAdmin['hash'];
};
export type CreateAdmin = (param: CreateAdminParam) => Promise<IAdmin>;

// get-admin controller
export type GetAdminQuery = { [field in keyof IAdmin]?: IAdmin[field] };
export type GetOneAdmin = (query: GetAdminQuery, projection?: Projection) => Promise<IAdmin | null>;
export type GetMultipleAdmin = (query?: GetAdminQuery, projection?: Projection) => Promise<IAdmin[]>;
