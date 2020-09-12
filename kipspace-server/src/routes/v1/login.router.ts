import { Router } from 'express';
import LoginService from '@services/login.service';

import { LoginEmailValidator } from '@validators/login.validator';

const LoginRouter = Router();
const Login = new LoginService();

// Expose request handlers to the service
LoginRouter.use((req, res, next) => {
	Login.Request = req;
	Login.Response = res;
	Login.Next = next;

	next();
});

LoginRouter.post('/', Login.ValidateFields(LoginEmailValidator), Login.LoginEmail);

export default LoginRouter;
