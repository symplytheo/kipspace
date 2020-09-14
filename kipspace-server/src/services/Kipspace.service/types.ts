import { Response, Request, NextFunction } from 'express';
import { ValidationChain } from 'express-validator';
import { ValidationError } from 'apollo-server-express';

export type SendResponse<M> = (params: {
	message: string;
	status: number;
	payload?: M | M[] | string | number;
	error?: Error | Error[] | ValidationError[];
	meta?: { [x: string]: unknown };
	token?: string;
}) => void;

export type AuthenticateUser = (request?: Request) => Promise<void>;

export type ValidateFields = (
	validationChain: ValidationChain[]
) => (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;

export type GenerateToken = (payload: { [x: string]: unknown }) => string;
