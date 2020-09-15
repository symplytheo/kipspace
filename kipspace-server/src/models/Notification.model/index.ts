import { Model, model } from 'mongoose';
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose';

import { INotification } from './types';
import {
	NotificationSchema,
	UserNotificationSchema,
	FacilityNotificationSchema,
	ProtectedFields,
	ImmutableFields,
} from './Schema';

const Notification: Model<INotification> = model('Notification', NotificationSchema);

const UserNotification = Notification.discriminator(
	'UserNotification',
	UserNotificationSchema
);
const FacilityNotification = Notification.discriminator(
	'FacilityNotification',
	FacilityNotificationSchema
);

const NotificationTC = composeWithMongooseDiscriminators(Notification, {
	fields: { remove: ProtectedFields },
	inputType: { fields: { remove: ImmutableFields } },
});

const UserNotificationTC = NotificationTC.discriminator(UserNotification);
const FacilityNotificationTC = NotificationTC.discriminator(FacilityNotification);

export * from './types';
export {
	UserNotification,
	FacilityNotification,
	NotificationTC,
	UserNotificationTC,
	FacilityNotificationTC,
};
export default Notification;
