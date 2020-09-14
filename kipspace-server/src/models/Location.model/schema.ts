import { Schema, Types } from 'mongoose';
import { validateCountry } from './validators';

export const ProtectedFields = [];
export const ImmutableFields = ['email_verified', 'phone_verified', 'user', 'facility'];

export const LocationSchema = new Schema(
	{
		address: { type: String, required: true, maxlength: 100, text: true },
		state: { type: String, text: true },
		city: { type: String, required: true, text: true },
		country: {
			type: Types.ObjectId,
			ref: 'Country',
			required: true,
			validate: {
				validator: validateCountry,
				message: 'Invalid country / country not supported',
			},
		},
		zip_code: { type: String },

		coordinates: {
			lng: { type: Number },
			lat: { type: Number },
		},
	},
	{ _id: false }
);
