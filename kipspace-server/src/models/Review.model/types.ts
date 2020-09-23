import { Document } from 'mongoose';
import { IFacility } from '@models/Facility.model';
import { IUser } from '@models/User.model';

export interface Review {
	user: IUser['_id'];
	facility: IFacility['_id'];
	display_name: string;
	review?: string;
	rating: number;
}

export interface IReview extends Review, Document {}
