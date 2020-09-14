import { Document, Types } from 'mongoose';
import { IUser } from '@models/User.model';
import { IFacility } from '@models/Facility.model';

export interface Location {
	type: 'USER' | 'FACILITY';
	user?: IUser['_id'];
	facility?: IFacility['_id'];
	address: string;
	state?: string;
	city: string;
	country: Types.ObjectId;
	zip_code?: string;
	coordinates?: {
		lng: number;
		lat: number;
	};
}

export interface ILocation extends Location, Document {}
