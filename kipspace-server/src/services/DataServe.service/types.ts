import { Response, Request } from 'express';

export type SendResponse<M> = (params: {
	message: string;
	status: number;
	payload?: M | M[] | string | number;
	error?: Error;
}) => Response;

export type AuthenticateUser = (request?: Request) => Promise<void>;
