import { Resolver } from 'graphql-compose';

export const ProtectFieldsWrapper = (
	resolver: Resolver,
	fields: string[],
	arg = 'filter'
) => {
	return resolver.wrap((nr) => {
		const resolverOTC = resolver.getOTC();

		nr.cloneArg(arg, `${resolverOTC.getTypeName()}PublicFilter`);
		nr.getArgITC(arg).removeField(fields);
		nr.getOTC().removeField(fields);

		return nr;
	});
};
