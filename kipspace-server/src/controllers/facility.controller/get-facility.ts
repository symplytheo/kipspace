import Facility from '@models/Facility.model';
import { GetMultipleFacility, GetOneFacility, Projection } from './types';

const defaultProjection: Projection = {};

export const getMultipleFacility: GetMultipleFacility = async (query, projection) => {
	try {
		const facility = await Facility.find(query || {}, { ...defaultProjection, ...(projection || {}) });

		return facility;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getOneFacility: GetOneFacility = async (query, projection) => {
	try {
		const facility = await Facility.findOne(query, { ...defaultProjection, ...(projection || {}) });

		return facility;
	} catch (error) {
		return Promise.reject(error);
	}
};
