import { Location, ILocation } from '@models/Location.model';

// user projection
export type Projection = { [field in keyof Location]?: number };

// create-user controller
export type CreateLocationParam = {
	address: ILocation['address'];
	city: ILocation['city'];
	country: ILocation['country'];
	state?: ILocation['state'];
	zip_code?: ILocation['zip_code'];
	user?: ILocation['user'];
	facility?: ILocation['facility'];
};
export type CreateLocation = (param: CreateLocationParam) => Promise<ILocation>;

// get-user controller
export type GetLocationQuery = { [field in keyof ILocation]?: ILocation[field] };
export type GetOneLocation = (query: GetLocationQuery, projection?: Projection) => Promise<ILocation | null>;
export type GetMultipleLocation = (query?: GetLocationQuery, projection?: Projection) => Promise<ILocation[]>;
