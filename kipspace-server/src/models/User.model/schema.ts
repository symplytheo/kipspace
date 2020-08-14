import { Schema, Types } from 'mongoose';

export const UserSchema: Schema = new Schema(
	{
		title: { type: String },
		firstname: { type: String },
		middlename: { type: String },
		lastname: { type: String },
		// username: { type: String, unique: true, required: true },
		email: { type: String, unique: true, required: true },
		phone: { type: String },
		avatar: { type: String },

		location: { type: Types.ObjectId, ref: 'Location' },

		reservations: [{ type: Types.ObjectId, ref: 'Reservation' }],
		notifications: [{ type: Types.ObjectId, ref: 'Notification' }],

		is_active: { type: Boolean, default: true },
		is_deleted: { type: Boolean, default: false },

		email_verified: { type: Boolean, default: false },
		phone_verified: { type: Boolean, default: false },

		hash: { type: String, required: true },
		token: { type: String },
		token_expire: { type: Date },
	},
	{
		timestamps: true,
	}
);
