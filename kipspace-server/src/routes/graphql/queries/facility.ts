import { ForbiddenError, UserInputError } from 'apollo-server-express';

import { FacilityTC } from '@models/Facility.model';
import { GetOneFacility } from '@daos/facility.dao';
import { ProtectFieldsWrapper } from '@middlewares/resolver-wrapper.middleware';
import { CheckAdmin, CheckAuth } from '@middlewares/resolver.middleware';

const ProtectFields = [
	// 'user',
	'email',
	'phone',
	'is_active',
	'is_deleted',
	'createdAt',
	'updatedAt',
	'notifications',
	'category.facilities',
	'category.createdAt',
	'category.updatedAt',
];

export const FacilityQuery = {
	facilities: ProtectFieldsWrapper(FacilityTC.getResolver('pagination'), ProtectFields),
	facilityOverview: ProtectFieldsWrapper(
		FacilityTC.getResolver('findOne'),
		ProtectFields
	),
	facility: FacilityTC.getResolver('findById', [
		CheckAuth,
		async (next, s, a, c: any, i) => {
			const facility = await GetOneFacility(a._id).catch(({ message }) => {
				throw new UserInputError(message, { invalidArgs: ['_id'] });
			});

			if (`${facility.user}` !== `${c.user._id}`)
				throw new ForbiddenError('Facility does not belong to you.');

			const res = next(s, a, c, i);

			return res;
		},
	]),
	facilityAdmin: FacilityTC.getResolver('findById', [CheckAuth, CheckAdmin]),
	facilitiesAdmin: FacilityTC.getResolver('pagination', [CheckAuth, CheckAdmin]),
};
