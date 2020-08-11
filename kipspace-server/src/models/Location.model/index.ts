import { Model, model } from 'mongoose';
import { ILocation } from './types';
import { LocationSchema } from './schema';

const Location: Model<ILocation> = model('Location', LocationSchema);

export * from './types';
export default Location;
