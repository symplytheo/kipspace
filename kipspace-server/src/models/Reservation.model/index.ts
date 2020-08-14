import { Model, model } from 'mongoose';
import { IReservation } from './types';
import { ReservationSchema } from './schema';

const Reservation: Model<IReservation> = model('Reservation', ReservationSchema);

export * from './types';
export default Reservation;
