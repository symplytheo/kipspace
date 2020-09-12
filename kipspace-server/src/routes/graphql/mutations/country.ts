import { CountryTC } from '@models/Country.model';

export const CountryMutation = {
	createCountry: CountryTC.getResolver('createOne'),
	updateCountry: CountryTC.getResolver('updateOne'),
};
