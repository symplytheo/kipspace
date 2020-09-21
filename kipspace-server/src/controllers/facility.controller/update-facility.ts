import { UpdateOneFacility } from './types';
import Facility from '@models/Facility.model';

export const updateFacility: UpdateOneFacility = async (query, fields) => {
	try {
		await Facility.updateOne(query, fields);
	} catch (error) {
		Promise.reject(error);
	}
};
