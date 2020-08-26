import Country, { ICountry } from '@models/Country.model';
import { CreateCountry } from './types';

export const createCountry: CreateCountry = async ({ name, currency_code, phone_code, short_code, flag_url }) => {
	try {
		const country: ICountry = new Country({
			name: name.toLowerCase().trim(),
			currency_code: currency_code.trim().toUpperCase(),
			short_code: short_code.trim().toUpperCase(),
			phone_code,
			flag_url,
		});

		await country.save();

		return country;
	} catch (error) {
		return Promise.reject(error);
	}
};
