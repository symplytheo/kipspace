import './hydrate';

import { SchemaComposer } from 'graphql-compose';

import {
	UserQuery,
	CategoryQuery,
	CountryQuery,
	FacilityQuery,
	ReservationQueries,
	ReviewQuery,
} from './queries';

import {
	UserMutation,
	CategoryMutation,
	CountryMutation,
	FacilityMutation,
	ReservationMutation,
	ReviewMutation,
} from './mutations';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
	...UserQuery,
	...CategoryQuery,
	...CountryQuery,
	...FacilityQuery,
	...ReservationQueries,
	...ReviewQuery,
});

schemaComposer.Mutation.addFields({
	...UserMutation,
	...CategoryMutation,
	...CountryMutation,
	...FacilityMutation,
	...ReservationMutation,
	...ReviewMutation,
});

export const schema = schemaComposer.buildSchema();
