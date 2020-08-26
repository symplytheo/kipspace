import Facility, { IFacility } from '@models/Facility.model';
import { CreateFacility } from './types';

export const createFacility: CreateFacility = async ({
	name,
	short_description,
	category,
	capacity,
	email,
	phone,
	opening_hours,
}) => {
	try {
		const facility: IFacility = new Facility({
			name: name.trim(),
			short_description: short_description.trim(),
			category,
			capacity,
			email,
			phone,
			opening_hours,
		});

		await facility.save();

		return facility;
	} catch (error) {
		return Promise.reject(error);
	}
};
