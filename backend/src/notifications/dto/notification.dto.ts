export enum notificationType {
  INFORMATION = 'information',
  REMINDER = 'reminder',
  WARNING = 'warning',
}

export enum notificationArea {
  TEAM_INTERACTIONS = 'team_interactions',
  DOMAIN = 'domain',
}

export class NotificationDto {
  id: string;
  createdAt: string;
  type: notificationType;
  area: notificationArea;
  summary: string;
  reason: string;
  read: boolean;
}
