import { Schema, Types } from 'mongoose';

export const NotificationSchema = new Schema(
	{
		title: { type: String, required: true, maxlength: 50 },
		description: { type: String, maxlength: 120 },

		user: { type: Types.ObjectId, ref: 'User' },
		reservation: { type: Types.ObjectId, ref: 'Reservation' },
		facility: { type: Types.ObjectId, ref: 'Facility' },
	},
	{
		timestamps: true,
	}
);
