import composeWithMongoose from 'graphql-compose-mongoose';
import { model, Model } from 'mongoose';
import { ProtectedFields, ReviewSchema, ImmutableFields } from './schema';
import { IReview } from './types';

const Review: Model<IReview> = model('Review', ReviewSchema);

const ReviewTC = composeWithMongoose(Review, {
	fields: { remove: ProtectedFields },
	inputType: { fields: { remove: ImmutableFields } },
});

export * from './types';
export { ReviewTC };
export default Review;
