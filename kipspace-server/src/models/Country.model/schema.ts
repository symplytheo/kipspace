import { Schema } from 'mongoose';

export const ProtectedFields = [];
export const ImmutableFields = ['createdAt', 'updatedAt'];

export const CountrySchema = new Schema(
	{
		name: { type: String, unique: true, required: true },
		short_code: {
			type: String,
			unique: true,
			minlength: 2,
			maxlength: 2,
			required: true,
		},
		flag_url: { type: String },
		currency_code: { type: String, minlength: 2, maxlength: 3, required: true },
		phone_code: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);
