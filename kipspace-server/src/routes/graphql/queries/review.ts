import { CheckAdmin, CheckAuth } from '@middlewares/resolver.middleware';
import { ReviewTC } from '@models/Review.model';

export const ReviewQuery = {
	reviews: ReviewTC.getResolver('pagination', [CheckAuth, CheckAdmin]),
	review: ReviewTC.getResolver('findById', [CheckAuth, CheckAdmin]),
};
