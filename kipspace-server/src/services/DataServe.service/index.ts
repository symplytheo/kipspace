import { Request, NextFunction, Response } from 'express';
import { OK, CREATED, ACCEPTED, UNAUTHORIZED, SERVICE_UNAVAILABLE } from 'http-status-codes';
import { IUser } from '@models/User.model';
import { IAdmin } from '@models/Admin.model';

import logger from '@shared/Logger';
import auth from '@middlewares/authentication';

import { SendResponse, AuthenticateUser } from './types';

class KipspaceService<Model> {
	constructor(request: Request, response: Response, next?: NextFunction) {
		this._request = request;
		this._response = response;

		if (next) this._next = next;
	}

	private _request: Request;
	private _response: Response;
	private _next?: NextFunction;

	private _currentUser?: IUser;
	private _currentAdmin?: IAdmin;

	private readonly _okStatuses = [OK, CREATED, ACCEPTED];

	public get CurrentUser(): IUser | null {
		return this._currentUser ? this._currentUser : null;
	}

	public get CurrentAdmin(): IAdmin | null {
		return this._currentAdmin ? this._currentAdmin : null;
	}

	/**
	 * @param request
	 */
	public AuthenticateUser: AuthenticateUser = async (request) => {
		try {
			const req = request || this._request;
			const token =
				(req.body && req.body.access_token) ||
				(req.query && req.query.access_token) ||
				req.headers['x-access-token'] ||
				req.cookies.access_token;
			const user = await auth(token);

			if (user) {
				this._currentUser = user as IUser;
				this._next && this._next();
			}
		} catch (error) {
			this.SendResponse({
				message: error.message,
				status: UNAUTHORIZED,
				error,
			});
		}
	};

	/**
	 * @param message<`string`>
	 * @param status
	 * @param payload
	 * @param error
	 */
	public SendResponse: SendResponse<Model> = ({ message, status, payload, error }) => {
		error && logger.error(error?.message);

		return this._response.status(status).send({
			state: error ? 'ERROR' : this._okStatuses.includes(status) ? 'OK' : 'NO',
			message,
			payload,
			error,
		});
	};
}

export default KipspaceService;
