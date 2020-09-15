import Country from '@models/Country.model';

export const validateCountry = async (_id: string) => {
	const c = await Country.findOne({ _id });
	if (c) return Promise.resolve(true);
	else return Promise.reject(false);
};

// export const validateUser = (_)
