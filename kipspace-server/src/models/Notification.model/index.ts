import { Model, model } from 'mongoose';
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose';
import { INotification } from './types';
import { NotificationSchema, UserNotificationSchema, FacilityNotificationSchema } from './Schema';

const Notification: Model<INotification> = model('Notification', NotificationSchema);

const UserNotification = Notification.discriminator('UserNotification', UserNotificationSchema);
const FacilityNotification = Notification.discriminator('FacilityNotification', FacilityNotificationSchema);

const NotificationTC = composeWithMongooseDiscriminators(Notification);

const UserNotificationTC = NotificationTC.discriminator(UserNotification);
const FacilityNotificationTC = NotificationTC.discriminator(FacilityNotification);

export * from './types';
export { UserNotification, FacilityNotification, NotificationTC, UserNotificationTC, FacilityNotificationTC };
export default Notification;
