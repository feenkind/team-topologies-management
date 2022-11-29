import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  notificationArea,
  NotificationDto,
  notificationType,
} from './dto/notification.dto';
import { DomainHistory, Interaction, Notification, Team } from '@prisma/client';
import { interactionMode } from '../teams/dto/interaction.dto';

const generateDomainReminderReason = () =>
  'A regular check of the domain complexity and priority is recommended.';

const generateDomainReminderSummary = (domainHistory: DomainHistory) =>
  `Please check, if domain ${
    domainHistory.name
  } is still up to date. It has last been updated on ${domainHistory.createdAt.toLocaleDateString(
    'en-GB',
  )}.`;

const generateTeamInteractionsFacilitatingReminderReason = () =>
  'A facilitating interaction should be checked again after 2-3 weeks.';

const generateTeamInteractionsFacilitatingWarningReason = () =>
  'A facilitating interaction should not last longer than 6 months';

const generateTeamInteractionsFacilitatingReminderSummary = (
  interaction: Interaction & { teamOne: Team; teamTwo: Team },
) =>
  `Please check if the interaction mode facilitating between ${
    interaction.teamOne.name
  } and ${
    interaction.teamTwo.name
  } is still valid. It started at ${interaction.startDate.toLocaleDateString(
    'en-GB',
  )}.`;

const generateTeamInteractionsFacilitatingWarningSummary = (
  interaction: Interaction & { teamOne: Team; teamTwo: Team },
) =>
  `Please reconsider the interaction mode facilitating between ${
    interaction.teamOne.name
  } and ${
    interaction.teamTwo.name
  }. It started at ${interaction.startDate.toLocaleDateString('en-GB')}.`;

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

  async triggerNotifications(): Promise<NotificationDto[]> {
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 6 * 30);

    const notifications: Notification[] = [];

    // check domains every 4 weeks
    const lastDomainUpdates = await this.prisma.domainHistory.findMany({
      distinct: ['domainId'],
      orderBy: { createdAt: 'desc' },
    });

    for (let i = 0; i < lastDomainUpdates.length; i++) {
      // do nothing if domain was updated in the last 4 weeks
      if (lastDomainUpdates[i].createdAt > fourWeeksAgo) {
        continue;
      }
      const area = notificationArea.DOMAIN;
      const reason = generateDomainReminderReason();
      const summary = generateDomainReminderSummary(lastDomainUpdates[i]);

      const newestExistingDomainNotification =
        await this.prisma.notification.findMany({
          where: {
            area,
            reason,
            summary,
          },
          orderBy: { createdAt: 'desc' },
          take: 1,
        });

      // no notification exists - create
      if (newestExistingDomainNotification.length === 0) {
        notifications.push(
          await this.prisma.notification.create({
            data: {
              type: notificationType.REMINDER,
              area,
              summary,
              reason,
              read: false,
            },
          }),
        );
        continue;
      }

      // check if notification was not read yet - do nothing then
      if (!newestExistingDomainNotification[0].read) {
        continue;
      }

      // check if last reminder was within last 4 weeks - do nothing then
      if (newestExistingDomainNotification[0].createdAt > fourWeeksAgo) {
        continue;
      }

      // otherwise create a reminder again
      notifications.push(
        await this.prisma.notification.create({
          data: {
            type: notificationType.REMINDER,
            area,
            summary,
            reason,
            read: false,
          },
        }),
      );
    }

    // check team interaction mode facilitating
    const facilitatingInteractions = await this.prisma.interaction.findMany({
      where: { interactionMode: interactionMode.FACILITATING },
      include: { teamOne: true, teamTwo: true },
    });

    for (let i = 0; i < facilitatingInteractions.length; i++) {
      const interactionStartDate = facilitatingInteractions[i].startDate;
      // do nothing if interaction was started in the last 2 weeks
      if (interactionStartDate > twoWeeksAgo) {
        continue;
      }

      const area = notificationArea.TEAM_INTERACTIONS;

      // create warning (if not already exists) if interaction mode already
      // lasts more than six months
      if (interactionStartDate < sixMonthsAgo) {
        const reason = generateTeamInteractionsFacilitatingWarningReason();
        const summary = generateTeamInteractionsFacilitatingWarningSummary(
          facilitatingInteractions[i],
        );

        const newestExistingInteractionNotification =
          await this.prisma.notification.findMany({
            where: { area, reason, summary },
            orderBy: { createdAt: 'desc' },
            take: 1,
          });

        if (newestExistingInteractionNotification.length === 0) {
          notifications.push(
            await this.prisma.notification.create({
              data: {
                type: notificationType.WARNING,
                area,
                summary,
                reason,
                read: false,
              },
            }),
          );
        }

        continue;
      }

      // otherwise create a reminder, because interaction already lasts
      // between 6 months and 2 weeks
      const reason = generateTeamInteractionsFacilitatingReminderReason();
      const summary = generateTeamInteractionsFacilitatingReminderSummary(
        facilitatingInteractions[i],
      );

      const newestExistingInteractionNotification =
        await this.prisma.notification.findMany({
          where: { area, reason, summary },
          orderBy: { createdAt: 'desc' },
          take: 1,
        });

      if (newestExistingInteractionNotification.length === 0) {
        notifications.push(
          await this.prisma.notification.create({
            data: {
              type: notificationType.REMINDER,
              area,
              summary,
              reason,
              read: false,
            },
          }),
        );
      }
    }

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
}
