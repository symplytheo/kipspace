import { getOneFacility } from '@controllers/facility.controller';
import { IFacility } from '@models/Facility.model';
import { Exception } from '@shared/functions';

export const GetOneFacility = async (_id: string): Promise<IFacility> => {
	try {
		const facility = await getOneFacility({ _id });

		if (!facility) throw new Exception(404, 'Facility not found /Invalid facility.');

		return facility;
	} catch (error) {
		return Promise.reject(error);
	}
};
