import './hydrate';

import { SchemaComposer } from 'graphql-compose';

import {
	UserQuery,
	CategoryQuery,
	CountryQuery,
	FacilityQuery,
	ReservationQueries,
} from './queries';

import {
	UserMutation,
	CategoryMutation,
	CountryMutation,
	FacilityMutation,
	ReservationMutation,
} from './mutations';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
	...UserQuery,
	...CategoryQuery,
	...CountryQuery,
	...FacilityQuery,
	...ReservationQueries,
});

schemaComposer.Mutation.addFields({
	...UserMutation,
	...CategoryMutation,
	...CountryMutation,
	...FacilityMutation,
	...ReservationMutation,
});

export const schema = schemaComposer.buildSchema();
