import { Schema, Types } from 'mongoose';

export const FacilitySchema: Schema = new Schema(
	{
		name: { type: String, required: true, maxlength: 50 },
		short_description: { type: String, required: true, maxlength: 150 },
		location: { type: Types.ObjectId, ref: 'Location' },
		categpry: { type: Types.ObjectId, ref: 'Category' },
		email: { type: String },
		phone: { type: String },
		capacity: { type: Number, default: 10, min: 0 },
		opening_hours: [],

		reservations: [{ type: Types.ObjectId, ref: 'Reservation' }],
		notifications: [{ type: Types.ObjectId, ref: 'Notification' }],

		is_active: { type: Boolean, default: true },
		is_deleted: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);
