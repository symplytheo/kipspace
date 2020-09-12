import { UserTC } from '@models/User.model';

export const UserMutation = {
	updateUser: UserTC.getResolver('updateOne'),
};
