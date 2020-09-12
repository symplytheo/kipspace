import { Request } from 'express';
import { AuthenticationError } from 'apollo-server-express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '@config';
// import { getOneUser } from '@controllers/user.controller';
import { IUser } from '@models/User.model';

export const ApolloContext = async ({ req }: { req: Request }) => {
	const token = req.headers.authorization;

	if (!token) throw new AuthenticationError('No authorization token');

	try {
		const decoded = verify(token, JWT_SECRET) as IUser;

		// const await getOneUser({ email: decoded.email });
		// TODO: Log authentication, session info and device info for user here
		// TODO: Do a second round of token validation here to use single login

		return decoded;
	} catch (error) {
		throw new AuthenticationError('Invalid token');
	}
};
