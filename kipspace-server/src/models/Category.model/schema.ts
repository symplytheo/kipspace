import { Schema } from 'mongoose';

export const CategorySchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, maxlength: 150 },
		icon: { type: String },
	},
	{
		timestamps: true,
	}
);
