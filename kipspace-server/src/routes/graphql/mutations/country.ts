import { CountryTC } from '@models/Country.model';
import { CheckAdmin, CheckAuth } from '@middlewares/resolver.middleware';

export const CountryMutation = {
	createCountry: CountryTC.getResolver('createOne', [CheckAuth, CheckAdmin]),
	updateCountry: CountryTC.getResolver('updateById', [CheckAuth, CheckAdmin]),
};
