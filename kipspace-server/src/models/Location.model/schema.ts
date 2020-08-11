import { Schema, Types } from 'mongoose';

export const LocationSchema = new Schema(
	{
		user: { type: Types.ObjectId, ref: 'User' }, // location for user ?

		address: { type: String, required: true, maxlength: 100, text: true },
		state: { type: String, required: true, text: true },
		city: { type: String, required: true, text: true },
		country: { type: Types.ObjectId, ref: 'Country', required: true },
		zip_code: { type: Number },

		coordinates: {
			lng: { type: Number },
			lat: { type: Number },
		},
	},
	{
		timestamps: true,
	}
);
