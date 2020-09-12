import { Request, NextFunction, Response } from 'express';
import {
	OK,
	CREATED,
	ACCEPTED,
	// UNAUTHORIZED,
	SERVICE_UNAVAILABLE,
	BAD_REQUEST,
} from 'http-status-codes';
import { validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';
import { ValidationError } from 'apollo-server-express';

import { IUser } from '@models/User.model';
// import { IAdmin } from '@models/Admin.model';
// import auth from '@middlewares/authentication';
import logger from '@shared/Logger';

import { JWT_SECRET } from '@config';

import { SendResponse, ValidateFields } from './types';

class KipspaceService<Model> {
	private _request?: Request;
	private _response?: Response;
	private _next?: NextFunction;

	private _currentUser?: IUser;
	// private _currentAdmin?: IAdmin;

	private readonly _okStatuses = [OK, CREATED, ACCEPTED];

	public set Request(req: Request) {
		this._request = req;
	}

	public set Response(res: Response) {
		this._response = res;
	}

	public set Next(next: NextFunction) {
		this._next = next;
	}

	public get CurrentUser(): IUser | null {
		return this._currentUser ? this._currentUser : null;
	}

	public set CurrentUser(user: IUser | null) {
		this._currentUser = user || undefined;
	}

	public get UserToken(): string | null {
		if (!this._currentUser) return null;

		const token = sign(
			{
				_id: this._currentUser._id,
				email: this._currentUser.email,
				role: this._currentUser.role,
			},
			JWT_SECRET,
			{ expiresIn: '30 days' }
		);

		return token;
	}

	/**
	 * @param request
	 */
	// public AuthenticateUser: AuthenticateUser = async (request) => {
	// 	try {
	// 		const req = request || this._request;
	// 		const token =
	// 			(req.body && req.body.access_token) ||
	// 			(req.query && req.query.access_token) ||
	// 			req.headers['x-access-token'] ||
	// 			req.cookies.access_token;
	// 		const user = await auth(token);

	// 		if (user) {
	// 			this._currentUser = user as IUser;
	// 			this._next && this._next();
	// 		}
	// 	} catch (error) {
	// 		this.SendResponse({
	// 			message: error.message,
	// 			status: UNAUTHORIZED,
	// 			error,
	// 		});
	// 	}
	// };

	/**
	 * validate
	 */
	public ValidateFields: ValidateFields = (validationChain) => {
		return async (
			req: Request,
			_: Response,
			next: NextFunction
		): Promise<Response | void> => {
			try {
				await Promise.all(validationChain.map((validation) => validation.run(req)));

				const errors = validationResult(req);

				if (errors.isEmpty()) return next();
				else {
					return this.SendResponse({
						message: 'Some fields missing/incorrect.',
						status: BAD_REQUEST,
						error: (errors.array() as unknown) as ValidationError[],
					});
				}
			} catch (error) {
				return this.SendResponse({
					message: 'Validation error occured.',
					status: SERVICE_UNAVAILABLE,
					error,
				});
			}
		};
	};

	public SendError = (error: any): void => {
		this.SendResponse({
			status: error.code || SERVICE_UNAVAILABLE,
			message: error.message,
			error: error,
		});
	};

	/**
	 * Send response
	 */
	public SendResponse: SendResponse<Model> = ({
		message,
		status,
		payload,
		error,
		token,
	}) => {
		error && logger.error(error);

		this._response &&
			this._response.status(status).send({
				state: error ? 'ERROR' : this._okStatuses.includes(status) ? 'OK' : 'NO',
				message,
				payload,
				error,
				token,
			});
	};
}

export default KipspaceService;
