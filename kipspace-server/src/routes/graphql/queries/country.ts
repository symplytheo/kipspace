import { CountryTC } from '@models/Country.model';

export const CountryQuery = {
	getOneCountry: CountryTC.getResolver('findOne'),
	getCountries: CountryTC.getResolver('findMany'),
	paginateCountries: CountryTC.getResolver('pagination'),
};
