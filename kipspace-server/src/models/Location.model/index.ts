import { Model, model } from 'mongoose';
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose';
import { ILocation } from './types';
import { LocationSchema, UserLocationSchema, FacilityLocationSchema } from './schema';

const Location: Model<ILocation> = model('Location', LocationSchema);

const UserLocation = Location.discriminator('UserLocation', UserLocationSchema);
const FacilityLocation = Location.discriminator('FacilityLocation', FacilityLocationSchema);

const LocationTC = composeWithMongooseDiscriminators(Location);

const UserLocationTC = LocationTC.discriminator(UserLocation);
const FacilityLocationTC = LocationTC.discriminator(FacilityLocation);

export * from './types';
export { UserLocation, FacilityLocation, LocationTC, UserLocationTC, FacilityLocationTC };
export default Location;
