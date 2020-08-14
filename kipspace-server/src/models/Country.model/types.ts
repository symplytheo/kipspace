import { Document } from 'mongoose';

export interface ICountry extends Document {
	name: string;
	short_code: string;
	flag_url?: string;
	currency_code: string;
	phone_code: string;
}
