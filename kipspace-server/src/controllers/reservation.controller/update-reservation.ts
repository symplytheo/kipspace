import { UpdateOneReservation } from './types';
import Reservation from '@models/Reservation.model';

export const updateReservation: UpdateOneReservation = async (query, fields) => {
	try {
		await Reservation.updateOne(query, fields);
	} catch (error) {
		Promise.reject(error);
	}
};
