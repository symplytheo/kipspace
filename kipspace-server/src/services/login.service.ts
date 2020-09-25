import { Request } from 'express';
import { OK } from 'http-status-codes';

import { IUser } from '@models/User.model';
import { CheckUserPassword } from '@daos/user.dao';

import KipspaceService from './Kipspace.service';

class LoginService extends KipspaceService<IUser> {
	public LoginEmail = async (req: Request) => {
		try {
			const user = await CheckUserPassword(
				req.body.email.toLowerCase(),
				req.body.password
			);

			this.CurrentUser = user;
			const token = this.UserToken || '';

			this.SendResponse({
				status: OK,
				message: 'Login successful',
				payload: user,
				token,
			});
		} catch (error) {
			this.SendError(error);
		}
	};
}

export default LoginService;
