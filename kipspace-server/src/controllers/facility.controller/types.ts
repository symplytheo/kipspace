import { Facility, IFacility } from '@models/Facility.model';

// user projection
export type Projection = { [field in keyof Facility]?: number };

export type FacilityQuery = { [field in keyof IFacility]?: IFacility[field] };

// create-user controller
export type CreateFacilityParam = {
	name: IFacility['name'];
	short_description: IFacility['short_description'];
	category: IFacility['category'];
	email?: IFacility['email'];
	phone?: IFacility['phone'];
	capacity?: IFacility['capacity'];
	opening_hours?: IFacility['opening_hours'];
};
export type CreateFacility = (param: CreateFacilityParam) => Promise<IFacility>;

// get-user controller
export type GetOneFacility = (
	query: FacilityQuery,
	projection?: Projection
) => Promise<IFacility | null>;
export type GetMultipleFacility = (
	query?: FacilityQuery,
	projection?: Projection
) => Promise<IFacility[]>;

// update-user controller
export type UpdateOneFacility = (
	query: FacilityQuery,
	fields: FacilityQuery
) => Promise<void>;
