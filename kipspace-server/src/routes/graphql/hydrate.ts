import { FacilityTC } from '@models/Facility.model';
import { FacilityNotificationTC, UserNotificationTC } from '@models/Notification.model';
import { ReservationTC } from '@models/Reservation.model';
import { UserTC } from '@models/User.model';
import { LocationTC } from '@models/Location.model';
import { CountryTC } from '@models/Country.model';
import { CategoryTC } from '@models/Category.model';
import { ReviewTC } from '@models/Review.model';

// User relations
UserTC.addRelation('facilities', {
	resolver: () => FacilityTC.getResolver('findMany'),
	prepareArgs: {
		filter: (source: any) => ({ user: source._id }),
	},
});

UserTC.addRelation('reservations', {
	resolver: () => ReservationTC.getResolver('findMany'),
	prepareArgs: {
		filter: (source: any) => ({ user: source._id }),
	},
});

UserTC.addRelation('notifications', {
	resolver: () => UserNotificationTC.getResolver('findMany'),
	prepareArgs: {
		filter: (source: any) => ({ user: source._id }),
	},
});

UserTC.addRelation('my_reviews', {
	resolver: () => ReviewTC.getResolver('findMany'),
	prepareArgs: {
		filter: (source: any) => ({ user: source._id }),
	},
});

const UserReviewsTC = UserTC.getFieldOTC('my_reviews');
UserReviewsTC.addRelation('facility', {
	resolver: () => FacilityTC.getResolver('findById'),
	prepareArgs: {
		_id: (source: any) => source.facility,
	},
});

// Reservations reations
ReservationTC.addRelation('user', {
	resolver: () => UserTC.getResolver('findById'),
	prepareArgs: {
		_id: (source: any) => source.user,
	},
});

ReservationTC.addRelation('facility', {
	resolver: () => FacilityTC.getResolver('findById'),
	prepareArgs: {
		_id: (source: any) => source.facility,
	},
});

// Location relations
LocationTC.addRelation('country', {
	resolver: () => CountryTC.getResolver('findById'),
	prepareArgs: {
		_id: (source: any) => source.country,
	},
});

// Facility relations
// FacilityTC.addRelation('user', {
// 	resolver: () => UserTC.getResolver('findById'),
// 	prepareArgs: {
// 		_id: (source: any) => source.user,
// 		skip: null,
// 		sort: null,
// 	},
// });

FacilityTC.addRelation('category', {
	resolver: () => CategoryTC.getResolver('findById'),
	prepareArgs: {
		_id: (source: any) => source.category,
	},
});

FacilityTC.addRelation('reservations', {
	resolver: () => ReservationTC.getResolver('findMany'),
	prepareArgs: {
		filter: (source: any) => ({ facility: source._id }),
	},
});

FacilityTC.addRelation('notifications', {
	resolver: () => FacilityNotificationTC.getResolver('findByIds'),
	prepareArgs: {
		_ids: (source: any) => source.notifications,
	},
});

FacilityTC.addRelation('reviews', {
	resolver: () => ReviewTC.getResolver('findMany'),
	prepareArgs: {
		filter: (source: any) => ({ facility: source._id }),
	},
});

// Category relations
CategoryTC.addRelation('facilities', {
	resolver: FacilityTC.getResolver('pagination'),
	prepareArgs: {
		filter: (source: any) => ({ category: source._id }),
	},
});

// Review rolations
// ReviewTC.addRelation('user', {
// 	resolver: UserTC.getResolver('findById'),
// 	prepareArgs: {
// 		_id: (source: any) => source.user,
// 	},
// });

// ReviewTC.addRelation('facility', {
// 	resolver: FacilityTC.getResolver('findById'),
// 	prepareArgs: {
// 		_id: (source: any) => source.facility,
// 	},
// 	projection: { name: true },
// });
