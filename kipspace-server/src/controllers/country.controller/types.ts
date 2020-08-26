import { Country, ICountry } from '@models/Country.model';

// user projection
export type Projection = { [field in keyof Country]?: number };

// create-user controller
export type CreateCountryParam = {
	name: ICountry['name'];
	short_code: ICountry['short_code'];
	currency_code: ICountry['currency_code'];
	phone_code: ICountry['phone_code'];
	flag_url?: ICountry['flag_url'];
};
export type CreateCountry = (param: CreateCountryParam) => Promise<ICountry>;

// get-user controller
export type GetCountryQuery = { [field in keyof ICountry]?: ICountry[field] };
export type GetOneCountry = (query: GetCountryQuery, projection?: Projection) => Promise<ICountry | null>;
export type GetMultipleCountry = (query?: GetCountryQuery, projection?: Projection) => Promise<ICountry[]>;
