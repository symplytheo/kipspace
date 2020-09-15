import { Model, model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import { ICountry } from './types';
import { CountrySchema, ImmutableFields, ProtectedFields } from './schema';

const Country: Model<ICountry> = model('Country', CountrySchema);

const CountryTC = composeWithMongoose(Country, {
	fields: { remove: ProtectedFields },
	inputType: { fields: { remove: ImmutableFields } },
});

export * from './types';
export { CountryTC };
export default Country;
