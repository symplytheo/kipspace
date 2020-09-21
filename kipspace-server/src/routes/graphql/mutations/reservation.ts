import { UserInputError } from 'apollo-server-express';
import { ReservationTC } from '@models/Reservation.model';
import { CheckAdmin, CheckAuth } from '@middlewares/resolver.middleware';
import {
	MakeReservation,
	CompleteReservation,
	CancelReservation,
} from '@daos/reservation.dao';

ReservationTC.addResolver({
	name: 'complete',
	displayName: 'CompleteReservation',
	description: 'Complete a pending reservation.',
	args: { code: 'String!', facility: 'MongoID!' },
	type: () => ReservationTC,
	resolve: async ({ args }: { args: any }) => {
		const reservation = await CompleteReservation(args.code, args.facility).catch(
			({ message }) => {
				throw new UserInputError(message);
			}
		);

		// create reservation event here
		return reservation;
	},
});

ReservationTC.addResolver({
	name: 'cancel',
	displayName: 'CancelReservation',
	description: 'cancel a reservation.',
	args: { code: 'String!' },
	type: () => ReservationTC,
	resolve: async ({ context, args }: { context: any; args: any }) => {
		const reservation = await CancelReservation(args.code, context.user._id).catch(
			({ message }) => {
				throw new UserInputError(message);
			}
		);

		// create reservation event here
		return reservation;
	},
});

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
	completeReservation: ReservationTC.getResolver('complete', [CheckAuth]),
	cancelReservation: ReservationTC.getResolver('cancel', [CheckAuth]),
	updateReservation: ReservationTC.getResolver('updateById', [CheckAuth, CheckAdmin]),
};
