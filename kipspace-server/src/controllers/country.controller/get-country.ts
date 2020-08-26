import Country from '@models/Country.model';
import { GetMultipleCountry, GetOneCountry, Projection } from './types';

const defaultProjection: Projection = {};

export const getMultipleCountry: GetMultipleCountry = async (query, projection) => {
	try {
		const country = await Country.find(query || {}, { ...defaultProjection, ...(projection || {}) });

		return country;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getOneCountry: GetOneCountry = async (query, projection) => {
	try {
		const country = await Country.findOne(query, { ...defaultProjection, ...(projection || {}) });

		return country;
	} catch (error) {
		return Promise.reject(error);
	}
};
