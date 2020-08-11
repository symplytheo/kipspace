import { IUser } from '@models/User.model';
import { IReservation } from '@models/Reservation.model';
import { IFacility } from '@models/Facility.model';
import { Document } from 'mongoose';

export interface Notification {
	title: string;
	description: string;
	user: IUser['_id'];
	reservation: IReservation['_id'];
	facility: IFacility['_id'];
}

export interface INotification extends Notification, Document {}
