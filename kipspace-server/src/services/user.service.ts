import { Request, Response } from 'express';
import { SERVICE_UNAVAILABLE, OK, NOT_FOUND } from 'http-status-codes';
import KipspaceService from '@services/Kipspace.service';
import { getOneUser, getMultipleUser } from '@controllers/user.controller';
import { IUser } from '@models/User.model';

class UserService extends KipspaceService<IUser> {
	public CreateUser = async (req: Request): Promise<Response | null> => {
		try {
			return this.SendResponse({
				status: OK,
				message: 'user created successfully',
				payload: req.body,
			});
		} catch (error) {
			return this.SendResponse({
				status: SERVICE_UNAVAILABLE,
				message: error.message,
				error: error,
			});
		}
	};

	public GetSingleUser = async (req: Request): Promise<Response | null> => {
		try {
			const { id } = req.params;

			const user = await getOneUser({ _id: id });

			if (!user) {
				return this.SendResponse({
					status: NOT_FOUND,
					message: 'user not found',
				});
			}

			const userDoc = user.populate('location').populate('added_facilities', ['name', 'short_bio'] as any);
			const userData = await userDoc.execPopulate();

			return this.SendResponse({
				status: OK,
				message: 'user fetched successfully',
				payload: userData,
			});
		} catch (error) {
			return this.SendResponse({
				status: SERVICE_UNAVAILABLE,
				message: error.message,
				error: error,
			});
		}
	};

	// public async LoadUserProfile(req: Request, res: Response): Promise<Response | null> {
	// 	try {
	// 		const user = await getOneUser({ email: req.decoded?.email });

	// 		return res.status(200).send({
	// 			state: 'OK',
	// 			payload: user && {
	// 				title: user.title,
	// 				firstname: user.firstname,
	// 				middlename: user.middlename,
	// 				lastname: user.lastname,
	// 				email: user.email,
	// 				phone: user.phone,
	// 				avatar: user.avatar,
	// 				email_verified: user.email_verified,
	// 				phone_verified: user.phone_verified,
	// 			},
	// 			message: 'User profile loaded successfully',
	// 		});
	// 	} catch (error) {
	// 		logger.error(error.message, 'GetUserProfile');

	// 		return res.send(SERVICE_UNAVAILABLE).send({
	// 			state: 'ERROR',
	// 			message: error.message,
	// 			payload: error,
	// 		});
	// 	}
	// }
}

export default UserService;
