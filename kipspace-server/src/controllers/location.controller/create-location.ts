import Location, { ILocation } from '@models/Location.model';
import { CreateLocation } from './types';

export const createLocation: CreateLocation = async ({ address, city, country, facility, state, user, zip_code }) => {
	try {
		const location: ILocation = new Location({
			address: address.trim(),
			city: city.trim(),
			state: state?.trim(),
			country,
			facility,
			user,
			zip_code,
		});

		await location.save();

		return location;
	} catch (error) {
		return Promise.reject(error);
	}
};
