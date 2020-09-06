import { Model, model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { IFacility } from './types';
import { FacilitySchema } from './schema';
import { FacilityLocationTC } from '@models/Location.model';
import { CategoryTC } from '@models/Category.model';
import { ReservationTC } from '@models/Reservation.model';
import { NotificationTC } from '@models/Notification.model';

const Facility: Model<IFacility> = model('Facility', FacilitySchema);

const FacilityTC = composeWithMongoose(Facility);

FacilityTC.addRelation('location', {
	resolver: () => FacilityLocationTC.getResolver('findById'),
});

FacilityTC.addRelation('category', {
	resolver: () => CategoryTC.getResolver('findById'),
});

FacilityTC.addRelation('reservations', {
	resolver: () => ReservationTC.getResolver('findByIds'),
});

FacilityTC.addRelation('notifications', {
	resolver: () => NotificationTC.getResolver('findByIds'),
});

export * from './types';
export { FacilityTC };
export default Facility;
