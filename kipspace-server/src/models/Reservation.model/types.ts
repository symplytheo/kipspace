import { Document } from 'mongoose';
import { IUser } from '@models/User.model';
import { IFacility } from '@models/Facility.model/types';
import { INotification } from '@models/Notification.model';

type status = 'COMPLETED' | 'CANCELED' | 'PENDING' | 'MISSED';
interface Status extends Document {
	status: status;
}
export interface Reservation {
	user: IUser['_id'];
	facility: IFacility['_id'];
	seats: number;
	code?: string;
	barcode_url?: string;
	notifications: INotification['_id'][];
	date_reserved: string;
	time_reserved: string;
	current_status: status;
	statuses: Status[];
}

export interface IReservation extends Reservation, Document {}
