import { Document } from 'mongoose';

export interface Country {
	name: string;
	short_code: string;
	flag_url?: string;
	currency_code: string;
	phone_code: string;
}

export interface ICountry extends Country, Document {}
