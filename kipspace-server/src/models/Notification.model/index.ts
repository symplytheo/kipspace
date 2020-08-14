import { Model, model } from 'mongoose';
import { INotification } from './types';
import { NotificationSchema } from './Schema';

const Notification: Model<INotification> = model('Notification', NotificationSchema);

export * from './types';
export default Notification;
