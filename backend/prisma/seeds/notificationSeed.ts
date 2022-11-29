import { PrismaClient } from '@prisma/client';

enum notificationArea {
  TEAM_INTERACTIONS = 'team_interactions',
  DOMAIN = 'domain',
}

enum notificationType {
  INFORMATION = 'information',
  REMINDER = 'reminder',
  WARNING = 'warning',
}

/**
 * {
      id: '1',
      type: notificationType.REMINDER,
      area: notificationArea.TEAM_INTERACTIONS,
      summary: 'Check the priority of domain "registration"',
      reason:
        'The priority of a domain should be checked at least every 6 months. ',
      date: '2022-03-29',
      read: true,
    },
 {
      id: '2',
      type: notificationType.REMINDER,
      area: notificationArea.TEAM_INTERACTIONS,
      summary:
        'Check the interaction mode between AwesomeTeam and SomeRandomTeam',
      reason:
        'The interaction mode “facilitating” already exists for more than 3' +
        ' weeks.',
      date: '2022-05-21',
      read: false,
    },
 {
      id: '3',
      type: notificationType.WARNING,
      area: notificationArea.TEAM_INTERACTIONS,
      summary:
        'Check the interaction mode between AwesomeTeam and SomeRandomTeam',
      reason:
        'The interaction mode “facilitating” already exists for more than 6 months.',
      date: '2022-11-01',
      read: false,
    },
 {
      id: '4',
      type: notificationType.REMINDER,
      area: notificationArea.DOMAIN,
      summary: 'Check the complexity of domain "registration"',
      reason: 'A regular complexity check of domains is recommended.',
      date: '2022-10-07',
      read: false,
    },
 */

const createNotifications = async (prisma: PrismaClient) => {
  const notifications = await prisma.notification.createMany({
    data: [
      {
        type: notificationType.REMINDER,
        area: notificationArea.DOMAIN,
        summary: 'Check complexity',
        reason: 'The complexity of a domain should be checked regularly.',
        read: false,
      },
    ],
  });

  console.log(`Created following notifications: `, {
    notifications,
  });
};

export default createNotifications;
