import { LocationTC } from '@models/Location.model';

export const LocationQuery = {
	getOneLocation: LocationTC.getResolver('findOne'),
	getLocations: LocationTC.getResolver('findMany'),
	paginateUsers: LocationTC.getResolver('pagination'),
};
