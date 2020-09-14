import { Model, model } from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { convertSchemaToGraphQL } from 'graphql-compose-mongoose';

import { ILocation } from './types';
import { LocationSchema } from './schema';

const Location: Model<ILocation> = model('Location', LocationSchema);

const LocationTC = convertSchemaToGraphQL(LocationSchema, 'Location', schemaComposer);

export * from './types';
export { LocationTC, LocationSchema };
export default Location;
