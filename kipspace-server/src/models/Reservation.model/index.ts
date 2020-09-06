import { Model, model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { IReservation } from './types';
import { ReservationSchema } from './schema';

const Reservation: Model<IReservation> = model('Reservation', ReservationSchema);

const ReservationTC = composeWithMongoose(Reservation);

export * from './types';
export { ReservationTC };
export default Reservation;
