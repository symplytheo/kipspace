import { Facility, IFacility } from '@models/Facility.model';

// user projection
export type Projection = { [field in keyof Facility]?: number };

// create-user controller
export type CreateFacilityParam = {
	name: IFacility['name'];
	short_description: IFacility['short_description'];
	category: IFacility['categpry'];
	email?: IFacility['email'];
	phone?: IFacility['phone'];
	capacity?: IFacility['capacity'];
	opening_hours?: IFacility['opening_hours'];
};
export type CreateFacility = (param: CreateFacilityParam) => Promise<IFacility>;

// get-user controller
export type GetFacilityQuery = { [field in keyof IFacility]?: IFacility[field] };
export type GetOneFacility = (query: GetFacilityQuery, projection?: Projection) => Promise<IFacility | null>;
export type GetMultipleFacility = (query?: GetFacilityQuery, projection?: Projection) => Promise<IFacility[]>;
