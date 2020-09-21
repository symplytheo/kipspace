import { UserInputError } from 'apollo-server-express';
import { ReservationTC } from '@models/Reservation.model';
import { AttachUserToArg, CheckAdmin, CheckAuth } from '@middlewares/resolver.middleware';
import { MakeReservation } from '@daos/reservation.dao';

export const ReservationMutation = {
	makeReservation: ReservationTC.getResolver('createOne')
		.wrap(
			(resolver) => {
				resolver.cloneArg('record', 'NewReservation');
				resolver
					.getArgITC('record')
					.removeField(['user', 'code', 'current_status', 'statuses', '_id']);

				return resolver;
			},
			{
				displayName: 'MakeReservation',
				description: 'Make a new reservation in a facility.',
				args: { record: ReservationTC.getInputType() },
				resolve: async ({ context, args }) => {
					const reservation = await MakeReservation(
						(context as any).user._id,
						args.record.facility,
						args.record.seats,
						args.record.date_reserved,
						args.record.time_reserved
					).catch(({ message }) => {
						throw new UserInputError(message);
					});

					// create reservation event here
					return {
						record: reservation,
					};
				},
			}
		)
		.withMiddlewares([CheckAuth]),
	updateReservation: ReservationTC.getResolver('updateById', [CheckAuth, CheckAdmin]),
};
