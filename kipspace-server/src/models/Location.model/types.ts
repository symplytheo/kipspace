import { Document, Types } from 'mongoose';
import { IUser } from '@models/User.model';

export interface ILocation extends Document {
	user?: IUser['_id'];
	address: string;
	state: string;
	city: string;
	country: Types.ObjectId;
	zip_code?: number;
	coordinates?: {
		lng: number;
		lat: number;
	};
}
