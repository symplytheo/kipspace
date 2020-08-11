import { Model, model } from 'mongoose';
import { IFacility } from './types';
import { FacilitySchema } from './schema';

const Facility: Model<IFacility> = model('Facility', FacilitySchema);

export * from './types';
export default Facility;
