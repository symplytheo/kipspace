import { Router } from 'express';
import UserService from '@services/user.service';

import { CreateUserValidator } from '@validators/user.validator';

const UserRouter = Router();
const User = new UserService();

// Expose request handlers to the service
UserRouter.use((req, res, next) => {
	User.Request = req;
	User.Response = res;

	next();
});

UserRouter.post('/', User.ValidateFields(CreateUserValidator), User.CreateAccount);

export default UserRouter;
