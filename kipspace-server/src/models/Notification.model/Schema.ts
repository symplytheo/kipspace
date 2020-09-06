import { Schema, Types } from 'mongoose';

const enumNotificationType = {
	USER: 'User',
	FACILITYY: 'Facility',
};

export const NotificationSchema = new Schema(
	{
		type: {
			type: String,
			required: true,
			enum: Object.keys(enumNotificationType),
			description: 'Notification type User or Facility',
		},
		title: { type: String, required: true, maxlength: 50 },
		description: { type: String, maxlength: 120 },
		reservation: { type: Types.ObjectId, ref: 'Reservation' },
	},
	{
		timestamps: true,
	}
);

NotificationSchema.set('discriminatorKey', 'type');

export const UserNotificationSchema = new Schema({
	user: { type: Types.ObjectId, ref: 'User', required: true },
});

export const FacilityNotificationSchema = new Schema({
	facility: { type: Types.ObjectId, ref: 'Facility', required: true },
});
