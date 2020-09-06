import { Model, model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { UserSchema, ProtectedFields } from './schema';
import { IUser } from './types';
import { UserLocationTC } from '@models/Location.model';
import { FacilityTC } from '@models/Facility.model';
import { ReservationTC } from '@models/Reservation.model';
import { UserNotificationTC } from '@models/Notification.model';

const User: Model<IUser> = model('User', UserSchema);

const UserTC = composeWithMongoose(User, { fields: { remove: ProtectedFields } });

UserTC.addRelation('location', {
	resolver: () => UserLocationTC.getResolver('findById'),
	prepareArgs: {
		// _id: (source) => source.locationId,
	},
});

UserTC.addRelation('facilities', {
	resolver: () => FacilityTC.getResolver('findByIds'),
});

UserTC.addRelation('reservations', {
	resolver: () => ReservationTC.getResolver('findByIds'),
});

UserTC.addRelation('notifications', {
	resolver: () => UserNotificationTC.getResolver('findByIds'),
});

export * from './types';
export { UserTC };
export default User;
