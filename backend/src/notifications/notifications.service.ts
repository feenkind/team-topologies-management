import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  notificationArea,
  NotificationDto,
  notificationType,
} from './dto/notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<NotificationDto[]> {
    const notifications = await this.prisma.notification.findMany();
    return notifications.map((notification) => ({
      id: notification.id,
      createdAt: notification.createdAt.toUTCString(),
      type: notification.type as notificationType,
      area: notification.area as notificationArea,
      summary: notification.summary,
      reason: notification.reason,
      read: notification.read,
    }));
  }

  async markRead(id: string): Promise<NotificationDto> {
    const notification = await this.prisma.notification.update({
      where: { id: id },
      data: { read: true },
    });

    return {
      id: notification.id,
      createdAt: notification.createdAt.toUTCString(),
      type: notification.type as notificationType,
      area: notification.area as notificationArea,
      summary: notification.summary,
      reason: notification.reason,
      read: notification.read,
    };
  }

  async triggerNotifications(): Promise<NotificationDto | null> {
    const notification = await this.prisma.notification.create({
      data: {
        type: notificationType.REMINDER,
        area: notificationArea.TEAM_INTERACTIONS,
        summary: 'Test',
        reason: 'Test reasons',
        read: false,
      },
    });
    //return null;

    return {
      id: notification.id,
      createdAt: notification.createdAt.toUTCString(),
      type: notification.type as notificationType,
      area: notification.area as notificationArea,
      summary: notification.summary,
      reason: notification.reason,
      read: notification.read,
    };
  }
}
