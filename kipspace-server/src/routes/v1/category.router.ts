import { Router } from 'express';
import CategoryService from '@services/category.service';

const CategoryRouter = Router();
const Category = new CategoryService();

// Expose request handlers to the service
CategoryRouter.use((req, res, next) => {
	Category.Request = req;
	Category.Response = res;

	next();
});

CategoryRouter.put(
	'/:id/icon',
	Category.AuthenticateUser,
	Category.CheckAdmin,
	Category.UploadFile('categories/:id/icon'),
	Category.UpdateIcon
);

export default CategoryRouter;
