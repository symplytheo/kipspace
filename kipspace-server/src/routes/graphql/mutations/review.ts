import { UserInputError } from 'apollo-server-express';
import { GetOneFacility } from '@daos/facility.dao';
import { AttachUserToArg, CheckAuth } from '@middlewares/resolver.middleware';
import { ReviewTC } from '@models/Review.model';
import { CheckReviewStatus } from '@daos/review.dao';

export const ReviewMutation = {
	reviewFacility: ReviewTC.getResolver('createOne')
		.wrapResolve((next) => async ({ context, args, ...rp }) => {
			await GetOneFacility(args.record.facility).catch(({ message }) => {
				throw new UserInputError(message, { invalidArgs: ['facility'] });
			});

			if (await CheckReviewStatus((context as any).user._id, args.record.facility))
				throw new UserInputError('Facility has already been reviewed by you.');

			return next({ args, context, ...rp });
		})
		.withMiddlewares([CheckAuth, AttachUserToArg]),
};
