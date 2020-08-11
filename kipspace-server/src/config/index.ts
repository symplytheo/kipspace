import './loadenv';

export const PORT = process.env.PORT || '';
export const BASE_URL = process.env.BASE_URL || '';
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || '';
export const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY || '';
export const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET || '';
export const COOKIE_SECRET = process.env.COOKIE_SECRET || '';
export const FB_APP_ID = process.env.FB_APP_ID || '';
export const FB_SECRET = process.env.FB_SECRET || '';
export const GG_CLIENT_ID = process.env.GG_CLIENT_ID || '';
export const GG_CLIENT_SECRET = process.env.GG_CLIENT_SECRET || '';
export const JWT_SECRET = process.env.JWT_SECRET || '';
export const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET || '';
export const MONGODB_URI = process.env.MONGODB_URI || '';
export const JWT_HEADER = {
	typ: 'JWT',
	alg: 'HS256',
};
