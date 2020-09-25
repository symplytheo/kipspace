import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';

import Reservation from '@models/Reservation.model';
import { GetOneFacility } from '@daos/facility.dao';
import { Exception } from '@shared/functions';

export const CancelReservation = async (code: string, user: string) => {
	try {
		const reservation = await Reservation.findOne({ code, user });

		if (!reservation) throw new Exception(NOT_FOUND, 'Reservation not found');

		switch (reservation.current_status) {
			case 'COMPLETED':
				throw new Exception(BAD_REQUEST, 'Cannot cancel a completed reservation.');

			case 'CANCELED':
				throw new Exception(BAD_REQUEST, 'Reservation already cancelled.');

			case 'MISSED':
				throw new Exception(BAD_REQUEST, 'Cannot cancel a missed reservation.');

			case 'PENDING':
				const facility = await GetOneFacility(reservation.facility);

				if (!facility) throw new Exception(NOT_FOUND, 'Facility not found'); // this error should never be thrown

				await facility.updateOne({
					available_seats: facility.available_seats + reservation.seats,
				});

				await reservation.updateOne({
					current_status: 'CANCELED',
					$addToSet: { statuses: { status: 'CANCELED' } },
				});

				reservation.current_status = 'CANCELED';

				return reservation;

			default:
				throw new Exception(BAD_REQUEST, 'Reservation status cannot be determined.');
		}
	} catch (error) {
		return Promise.reject(error);
	}
};
