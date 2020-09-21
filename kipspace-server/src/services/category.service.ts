import { Request } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';

import { ICategory } from '@models/Category.model';
import { Exception } from '@shared/functions';
import { UpdateCategoryIcon } from '@daos/category.dao';

import KipspaceService from './Kipspace.service';

class CategoryService extends KipspaceService<ICategory> {
	public UpdateIcon = async (req: Request): Promise<void> => {
		try {
			if (!req.file) throw new Exception(BAD_REQUEST, 'No or invalid image');

			await UpdateCategoryIcon(req.params.id, (req.file as any).path);

			this.SendResponse({
				status: OK,
				message: 'Icon updated successfully',
				payload: (req.file as any).path,
			});
		} catch (error) {
			this.SendError(error);
		}
	};
}

export default CategoryService;
