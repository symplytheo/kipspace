import { Schema, Types } from 'mongoose';

export const ProtectedFields = [];
export const ImmutableFields = ['createdAt', 'updatedAt', 'user'];

export const ReviewSchema = new Schema(
	{
		user: { type: Types.ObjectId, ref: 'User', required: true },
		facility: { type: Types.ObjectId, ref: 'facility', required: true },

		display_name: { type: String, required: true, maxlength: 15 },
		review: { type: String, maxlength: 160 },
		rating: { type: Number, max: 5, min: 0, required: true },
	},
	{
		timestamps: true,
	}
);
