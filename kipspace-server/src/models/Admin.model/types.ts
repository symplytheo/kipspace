import { Document } from 'mongoose';

export interface Admin {
	firstname: string;
	lastname: string;
	middlename: string;
	email: string;
	hash: string;
	is_active: boolean;
}

export interface IAdmin extends Admin, Document {}
