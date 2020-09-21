import { NOT_FOUND } from 'http-status-codes';

import { getOneFacility } from '@controllers/facility.controller';
import { Exception } from '@shared/functions';
import { updateFacility } from '@controllers/facility.controller/update-facility';

export const UpdateFacilityCover = async (
	userId: string,
	facilityId: string,
	photoUrl: string
) => {
	try {
		const facility = await getOneFacility({ _id: facilityId, user: userId });

		if (!facility)
			throw new Exception(NOT_FOUND, 'Facility not found /Invalid facility.');

		await updateFacility({ _id: facilityId }, { cover: photoUrl });

		return facility;
	} catch (error) {
		return Promise.reject(error);
	}
};
