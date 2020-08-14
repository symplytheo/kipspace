import { Schema } from 'mongoose';

export const CountrySchema = new Schema(
	{
		name: { type: String, unique: true, required: true },
		short_code: { type: String, unique: true, required: true },
		flag_url: { type: String },
		currency_code: { type: String, maxlength: 3, required: true },
		phone_code: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);
