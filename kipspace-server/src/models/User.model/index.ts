import { Model, model } from 'mongoose';
import { UserSchema } from './schema';
import { IUser } from './types';

const User: Model<IUser> = model('User', UserSchema);

export * from './types';
export default User;
