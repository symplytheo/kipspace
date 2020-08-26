import { Schema, Types } from 'mongoose';

export const LocationSchema = new Schema(
	{
		user: { type: Types.ObjectId, ref: 'User' }, // location for user ?
		facility: { type: Types.ObjectId, ref: 'Facility' }, // location for facility ?

		address: { type: String, required: true, maxlength: 100, text: true },
		state: { type: String, text: true },
		city: { type: String, required: true, text: true },
		country: { type: Types.ObjectId, ref: 'Country', required: true },
		zip_code: { type: String },

		coordinates: {
			lng: { type: Number },
			lat: { type: Number },
		},
	},
	{
		timestamps: true,
	}
);
