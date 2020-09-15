import { Document } from 'mongoose';
import { ILocation } from '@models/Location.model';
import { IReservation } from '@models/Reservation.model';
import { INotification } from '@models/Notification.model';
import { IFacility } from '@models/Facility.model';

export interface User {
	firstname?: string;
	middlename?: string;
	lastname?: string;
	email: string;
	phone?: string;
	avatar?: string;
	location?: ILocation['_id'];
	facilities?: IFacility['_id'][];
	reservations?: IReservation['_id'][];
	notifications?: INotification['_id'][];
	is_active?: boolean;
	is_deleted?: boolean;
	email_verified?: boolean;
	phone_verified?: boolean;
	role: 'USER' | 'ADMIN';
	hash: string;
	token?: string;
	token_expire?: string;
}

export interface IUser extends User, Document {}
