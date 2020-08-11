import { Document } from 'mongoose';

export interface IAdmin extends Document {
	firstname: string;
	lastname: string;
	middlename: string;
	email: string;
	hash: string;
	is_active: boolean;
}
