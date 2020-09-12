import { FacilityTC } from '@models/Facility.model';

export const FacilityMutation = {
	updateFacility: FacilityTC.getResolver('updateOne'),
};
