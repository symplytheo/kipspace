import { Schema, Types } from 'mongoose';

export const ProtectedFields = [];
export const ImmutableFields = ['createdAt', 'updatedAt', 'user'];

export const StatusSchema = new Schema(
	{
		status: {
			type: String,
			required: true,
			default: 'PENDING',
			enum: ['COMPLETED', 'CANCELED', 'PENDING', 'MISSED'],
		},
	},
	{
		timestamps: true,
	}
);

export const ReservationSchema = new Schema(
	{
		user: { type: Types.ObjectId, ref: 'User', required: true },
		facility: { type: Types.ObjectId, ref: 'Facility', required: true },

		code: { type: String, unique: true, required: true },
		barcode_url: { type: String },

		seats: { type: Number, required: true, default: 1, min: 1 },
		// notifications: [],
		date_reserved: { type: Date, required: true },
		time_reserved: { type: String },

		current_status: {
			type: String,
			enum: ['COMPLETED', 'CANCELED', 'PENDING', 'MISSED'],
			default: 'PENDING',
		},
		statuses: [StatusSchema],
	},
	{
		timestamps: true,
	}
);
