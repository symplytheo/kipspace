import { FacilityTC } from '@models/Facility.model';
import { AttachUserToArg, CheckAuth } from '@middlewares/resolver.middleware';

export const FacilityMutation = {
	createFacility: FacilityTC.getResolver('createOne', [
		CheckAuth,
		AttachUserToArg,
		async (next, s, a, c, i) => {
			a.record.available = a.record.capacity;

			const res = await next(s, a, c, i);

			return res;
		},
	]),
	updateFacility: FacilityTC.getResolver('updateById', [CheckAuth]),
};
