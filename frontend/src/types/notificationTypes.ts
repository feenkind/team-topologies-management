import { notificationArea, notificationType } from '../constants/notifications';

export interface INotificationImport {
  id: string;
  createdAt: string;
  type: notificationType;
  area: notificationArea;
  summary: string;
  reason: string;
  read: boolean;
}
