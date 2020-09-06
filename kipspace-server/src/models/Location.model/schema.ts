import { Schema, Types } from 'mongoose';

const enumLocationType = {
	USER: 'User',
	FACILITY: 'Facility',
};

export const LocationSchema = new Schema(
	{
		type: {
			type: String,
			required: true,
			enum: Object.keys(enumLocationType),
			description: 'Location type User or Facility',
		},
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

LocationSchema.set('discriminatorKey', 'type');

export const UserLocationSchema = new Schema({
	user: { type: Types.ObjectId, required: true, ref: 'User' }, // location for user ?
});

export const FacilityLocationSchema = new Schema({
	facility: { type: Types.ObjectId, required: true, ref: 'Facility' }, // location for facility ?
});
