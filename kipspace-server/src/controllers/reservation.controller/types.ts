import { IReservation, Reservation } from '@models/Reservation.model';

export type Projection = { [field in keyof Reservation]?: number };

export type ReservationQuery = { [field in keyof IReservation]?: IReservation[field] };

export type GetOneReservation = (
	query: ReservationQuery,
	projection?: Projection
) => Promise<IReservation | null>;

export type GetMultipleReservation = (
	query?: ReservationQuery,
	projection?: Projection
) => Promise<IReservation[]>;

// update-facility controller
export type UpdateOneReservation = (
	query: ReservationQuery,
	fields: ReservationQuery
) => Promise<void>;
