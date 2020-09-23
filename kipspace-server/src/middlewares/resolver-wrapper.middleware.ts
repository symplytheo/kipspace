import { Resolver } from 'graphql-compose';

export const ProtectFieldsWrapper = (
	resolver: Resolver,
	fields: string[],
	arg = 'filter'
) => {
	return resolver
		.wrap((nr) => {
			const resolverOTC = resolver.getOTC();

			nr.cloneArg(arg, `${resolverOTC.getTypeName()}PublicFilter`);
			nr.getArgITC(arg).removeField(fields);

			return nr;
		})
		.wrap((nr) => {
			const resolverOTC = resolver.getOTC();
			const nrOTC = nr.getOTC().clone(`Public${resolverOTC.getTypeName()}`);

			nrOTC.removeField(fields);

			const nrr = nr.clone({
				type: () => nrOTC,
			});

			return nrr;
		});
};
