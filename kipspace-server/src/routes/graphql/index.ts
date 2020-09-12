import { SchemaComposer } from 'graphql-compose';

import { UserQuery, CategoryQuery, LocationQuery, CountryQuery } from './queries';

import { UserMutation, CategoryMutation, CountryMutation } from './mutations';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
	...UserQuery,
	...CategoryQuery,
	...CountryQuery,
	...LocationQuery,
});

schemaComposer.Mutation.addFields({
	...UserMutation,
	...CategoryMutation,
	...CountryMutation,
});

export const schema = schemaComposer.buildSchema();
