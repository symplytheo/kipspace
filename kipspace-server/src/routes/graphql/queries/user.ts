import { UserTC } from '@models/User.model';

export const UserQuery = {
	getOneUser: UserTC.getResolver('findOne'),
	getUsers: UserTC.getResolver('findMany'),
	paginateUsers: UserTC.getResolver('pagination'),
};
