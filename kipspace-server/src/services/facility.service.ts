import { Request } from 'express';
import { OK, BAD_REQUEST } from 'http-status-codes';

import { IFacility } from '@models/Facility.model';
import { Exception } from '@shared/functions';
import { UpdateFacilityCover, UpdateFacilityLogo } from '@daos/facility.dao';

import KipspaceService from './Kipspace.service';

class FacilityService extends KipspaceService<IFacility> {
	public UpdateCover = async (req: Request): Promise<void> => {
		try {
			if (!req.file) throw new Exception(BAD_REQUEST, 'No or invalid image');

			await UpdateFacilityCover(
				this.CurrentUser?._id,
				req.params.id,
				(req.file as any).path
			);

			this.SendResponse({
				status: OK,
				message: 'Cover updated successfully',
				payload: (req.file as any).path,
			});
		} catch (error) {
			this.SendError(error);
		}
	};

	public UpdateLogo = async (req: Request): Promise<void> => {
		try {
			if (!req.file) throw new Exception(BAD_REQUEST, 'No or invalid image');

			await UpdateFacilityLogo(
				this.CurrentUser?._id,
				req.params.id,
				(req.file as any).path
			);

			this.SendResponse({
				status: OK,
				message: 'Logo updated successfully',
				payload: (req.file as any).path,
			});
		} catch (error) {
			this.SendError(error);
		}
	};
}

export default FacilityService;
