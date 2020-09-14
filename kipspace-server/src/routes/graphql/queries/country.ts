import { CountryTC } from '@models/Country.model';

export const CountryQuery = {
	country: CountryTC.getResolver('findOne'),
	countries: CountryTC.getResolver('pagination'),
};
