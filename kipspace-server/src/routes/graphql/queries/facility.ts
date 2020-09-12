import { FacilityTC } from '@models/Facility.model';

export const FacilityQuery = {
	getOneFacility: FacilityTC.getResolver('findOne'),
	getFacilities: FacilityTC.getResolver('findMany'),
	paginateFacilities: FacilityTC.getResolver('pagination'),
};
