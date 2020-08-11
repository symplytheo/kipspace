import { Document } from 'mongoose';
import { ICategory } from '@models/Category.model';
import { IReservation } from '@models/Reservation.model';
import { INotification } from '@models/Notification.model';

interface OpeningHour {
	day: string;
	from: string;
	to: string;
}

export interface Facility {
	name: string;
	short_description: string;
	location: string;
	categpry: ICategory['_id'];
	email: string;
	phone: string;
	capacity: string;
	opening_hours: OpeningHour[];
	reservations: IReservation['_id'][];
	notifications: INotification['_id'][];
	is_active: boolean;
	is_deleted: boolean;
}

export interface IFacility extends Facility, Document {}
