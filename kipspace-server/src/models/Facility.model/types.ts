import { Document } from 'mongoose';
import { ICategory } from '@models/Category.model';
// import { IReservation } from '@models/Reservation.model';
import { INotification } from '@models/Notification.model';
import { IUser } from '@models/User.model';

interface OpeningHour {
	day: string;
	from: string;
	to: string;
}

export interface Facility {
	name: string;
	short_description: string;
	location: string;
	user: IUser['_id'];
	category: ICategory['_id'];
	cover?: string;
	logo?: string;
	gallery?: string;
	email: string;
	phone: string;
	capacity: number;
	available_seats: number;
	opening_hours: OpeningHour[];
	// reservations: IReservation['_id'][];
	notifications: INotification['_id'][];
	is_active: boolean;
	is_deleted: boolean;
}

export interface IFacility extends Facility, Document {}
