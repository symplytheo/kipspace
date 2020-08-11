import { Schema } from 'mongoose';

export const AdminSchema = new Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		middlename: { type: String },
		email: { type: String, required: true, unique: true },
		hash: { type: String, required: true },

		is_active: { type: Boolean, default: true },
	},
	{
		timestamps: true,
	}
);
