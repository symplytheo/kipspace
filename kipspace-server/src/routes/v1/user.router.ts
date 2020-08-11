import { Router } from 'express';
import UserService from '@services/user.service';

const UserRouter = Router();

UserRouter.use('/', (req, res, next) => {
	const User = new UserService(req, res);

	UserRouter.post('/', User.CreateUser);

	next();
});

export default UserRouter;
