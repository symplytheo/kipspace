import { CategoryTC } from '@models/Category.model';
import { ProtectFieldsWrapper } from '@middlewares/resolver-wrapper.middleware';
import { CheckAdmin, CheckAuth } from '@middlewares/resolver.middleware';

const ProtectFields = [
	'user',
	'email',
	'phone',
	'is_active',
	'is_deleted',
	'createdAt',
	'updatedAt',
	'notifications',
	'facilities.category',
	'facilities.items.email',
	'facilities.items.phone',
	'facilities.items.is_active',
	'facilities.items.is_deleted',
	'facilities.items.createdAt',
	'facilities.items.updatedAt',
	'facilities.items.notifications',
	'facilities.items.reviews.user',
	'facilities.items.reviews.facility',
	// 'facilities.items.reservations',
];

export const CategoryQuery = {
	category: ProtectFieldsWrapper(CategoryTC.getResolver('findOne'), ProtectFields),
	categories: ProtectFieldsWrapper(CategoryTC.getResolver('pagination'), ProtectFields),
	categoryAdmin: CategoryTC.getResolver('findById', [CheckAuth, CheckAdmin]),
	categoriesAdmin: CategoryTC.getResolver('pagination', [CheckAuth, CheckAdmin]),
};
