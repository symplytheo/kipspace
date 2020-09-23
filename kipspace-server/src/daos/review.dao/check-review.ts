import Review from '@models/Review.model';

export const CheckReviewStatus = async (user: string, facility: string) => {
	try {
		const review = await Review.findOne({ user, facility });

		if (review) return true;
		else return false;
	} catch (error) {
		return Promise.reject(error);
	}
};
