import { Schema, Types } from 'mongoose';
import { LocationSchema } from '@models/Location.model';

export const ProtectedFields = ['hash', 'token', 'token_expire'];
export const ImmutableFields = [
	'email_verified',
	'phone_verified',
	'createdAt',
	'updatedAt',
	'facilities',
	'reservations',
	'notifications',
];

export const UserSchema: Schema = new Schema(
	{
		// title: { type: String },
		firstname: { type: String },
		middlename: { type: String },
		lastname: { type: String },
		email: { type: String, unique: true, required: true },
		phone: { type: String },
		avatar: { type: String },

		location: LocationSchema,

		// facilities: [{ type: Types.ObjectId, ref: 'Facility' }],
		// reservations: [{ type: Types.ObjectId, ref: 'Reservation' }],
		// notifications: [{ type: Types.ObjectId, ref: 'Notification' }],

		is_active: { type: Boolean, default: true },
		is_deleted: { type: Boolean, default: false },

		email_verified: { type: Boolean, default: false },
		phone_verified: { type: Boolean, default: false },

		role: { type: String, default: 'USER', required: true, enum: ['USER', 'ADMIN'] },

		hash: { type: String, required: true },
		token: { type: String },
		token_expire: { type: Date },
	},
	{
		timestamps: true,
	}
);
