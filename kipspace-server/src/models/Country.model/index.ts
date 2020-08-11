import { Model, model } from 'mongoose';
import { ICountry } from './types';
import { CountrySchema } from './schema';

const Country: Model<ICountry> = model('Country', CountrySchema);

export * from './types';
export default Country;
