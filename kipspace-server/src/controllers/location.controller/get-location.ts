import Location from '@models/Location.model';
import { GetMultipleLocation, GetOneLocation, Projection } from './types';

const defaultProjection: Projection = {};

export const getMultipleLocation: GetMultipleLocation = async (query, projection) => {
	try {
		const location = await Location.find(query || {}, { ...defaultProjection, ...(projection || {}) });

		return location;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getOneLocation: GetOneLocation = async (query, projection) => {
	try {
		const location = await Location.findOne(query, { ...defaultProjection, ...(projection || {}) });

		return location;
	} catch (error) {
		return Promise.reject(error);
	}
};
