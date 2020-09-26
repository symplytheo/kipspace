import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';

import Reservation from '@models/Reservation.model';
import { GetOneFacility } from '@daos/facility.dao';
import { Exception } from '@shared/functions';

// TODO: Do a check to ensure only facility managers can complete a reservation

export const CompleteReservation = async (code: string, facilityId: string) => {
	try {
		const reservation = await Reservation.findOne({ code });

		if (!reservation) throw new Exception(NOT_FOUND, 'Reservation not found');

		switch (reservation.current_status) {
			case 'COMPLETED':
				throw new Exception(BAD_REQUEST, 'Reservation has already been fulfilled.');

			case 'CANCELED':
				throw new Exception(BAD_REQUEST, 'Cannot complete a cancelled reservation.');

			case 'MISSED':
				throw new Exception(BAD_REQUEST, 'Cannot complete a missed reservation.');

			case 'PENDING':
				const reservationDate = new Date(reservation.date_reserved);
				reservationDate.setHours(parseInt(reservation.time_reserved.split(':')[0]));
				reservationDate.setMinutes(parseInt(reservation.time_reserved.split(':')[1]));

				const layover = 900000; // 15 mins layover before closing reservation

				if (reservationDate.getTime() < Date.now() + layover) {
					await reservation.updateOne({
						current_status: 'MISSED',
						$addToSet: { statuses: { status: 'MISSED' } },
					});

					throw new Exception(BAD_REQUEST, 'Cannot complete a missed reservation.');
				}

				const facility = await GetOneFacility(reservation.facility);

				if (!facility) throw new Exception(NOT_FOUND, 'Facility not found'); // this error should never be thrown

				if (`${facility._id}` !== `${facilityId}`)
					throw new Exception(BAD_REQUEST, 'Facility mismatch');

				await facility.updateOne({
					available_seats: facility.available_seats + reservation.seats,
				});

				await reservation.updateOne({
					current_status: 'COMPLETED',
					$addToSet: { statuses: { status: 'COMPLETED' } },
				});

				reservation.current_status = 'COMPLETED';

				return reservation;

			default:
				throw new Exception(BAD_REQUEST, 'Reservation status cannot be determined.');
		}
	} catch (error) {
		return Promise.reject(error);
	}
};
