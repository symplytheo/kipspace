import { Model, model } from 'mongoose';
import { IAdmin } from './types';
import { AdminSchema } from './schema';

const Admin: Model<IAdmin> = model('Admin', AdminSchema);

export * from './types';
export default Admin;
