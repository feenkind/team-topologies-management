import { Domain, Team, PrismaClient } from '@prisma/client';
import {
  changeType,
  channelTypes,
  dependencyType,
  interactionMode,
  meetingsDay,
  TeamType,
  versioningType,
} from '../../src/teams/dto/create-team.dto';

const infrastructureTeam = {
  id: '',
  name: 'Infrastructure Team',
  teamType: TeamType.PLATFORM,
  domains: ['Infrastructure'],
  fte: 4,
  cognitiveLoad: 18,
  focus:
    'The infrastructure team is responsible for building and' +
    ' maintaining the shopping platform infrastructure',
  platform: 'Shopping Platform Infrastructure',
  wikiSearchTerms: ['infrastructure', 'shoppingPlatform', 'platform'],
  meetings: [
    {
      purpose: 'Daily sync',
      day: meetingsDay.DAILY,
      time: '9:30',
      durationMinutes: 15,
    },
    {
      purpose:
        'Meeting for any questions regarding our services, everybody' +
        ' is welcome to join.',
      day: meetingsDay.MONDAY,
      time: '14:00',
      durationMinutes: 30,
    },
  ],
  channels: [
    { type: channelTypes.SLACK, name: '#platform-team-infrastructure' },
    { type: channelTypes.SLACK, name: '#shopping-platform' },
  ],
  services: [
    {
      name: 'Deployment Service',
      url: 'https://github.com/example.com/example-service-a',
      repository: 'https://github.com/example.com/example-service-a',
      versioningType: versioningType.SEMANTIC,
    },
    {
      name: 'Logging Service',
      url: 'https://github.com/example.com/example-service-b',
      repository: 'https://github.com/example.com/example-service-b',
      versioningType: versioningType.SEMANTIC,
    },
  ],
  waysOfWorking: [
    {
      name: 'Scrum',
      url: 'https://scrumguides.org/',
    },
    {
      name: 'Lean',
      url: 'https://example.internal-wiki.com/ways-of-working/lean',
    },
  ],
  workInProgress: [
    {
      summary: 'Implementing add ons for deployment service',
      repository: 'https://github.com/example.com/example-service-a',
    },
    {
      summary: 'Helping with the preparations for the meetup in February',
      repository: '',
    },
  ],
  history: [
    {
      cognitiveLoad: 18,
      fte: 4,
      type: TeamType.PLATFORM,
      changeNote: 'Jana joined the team as full time dev.',
      createdAt: new Date('2022-11-21'),
    },
    {
      cognitiveLoad: 18,
      fte: 3,
      type: TeamType.PLATFORM,
      changeNote: 'Regular cognitive load check.',
      createdAt: new Date('2022-11-10'),
    },
    {
      cognitiveLoad: 23,
      fte: 3,
      type: TeamType.PLATFORM,
      changeNote:
        'Changed team type to match responsibilities and got James' +
        ' as new developer for the team.',
      createdAt: new Date('2022-08-13'),
    },
    {
      cognitiveLoad: 23,
      fte: 2,
      type: TeamType.UNDEFINED,
      changeNote: 'Initial creation.',
      createdAt: new Date('2022-08-10'),
    },
  ],
  historyDomains: [
    {
      domains: ['Infrastructure'],
      changeNote: 'Initial creation.',
      createdAt: new Date('2022-08-10'),
    },
  ],
};

const appTeam = {
  id: '',
  name: 'Mobile Apps Team',
  teamType: TeamType.STREAM_ALIGNED,
  domains: ['Mobile App iOS', 'Mobile App Android'],
  fte: 8,
  cognitiveLoad: 19,
  focus:
    'Taking care of all the app development at the moment - android and iOS.',
  wikiSearchTerms: ['app', 'shoppingPlatform', 'stream-aligned', 'mobile'],
  platform: null,
  meetings: [
    {
      purpose: 'Daily sync',
      day: meetingsDay.DAILY,
      time: '10:00',
      durationMinutes: 15,
    },
  ],
  channels: [
    { type: channelTypes.SLACK, name: '#stream-aligned-team-mobile-apps' },
    { type: channelTypes.SLACK, name: '#shopping-platform' },
  ],
  services: [],
  waysOfWorking: [
    {
      name: 'Scrum',
      url: 'https://scrumguides.org/',
    },
  ],
  workInProgress: [
    {
      summary: 'Adding new features to the android app',
      repository: 'https://github.com/example.com/example-service-a',
    },
    {
      summary: 'Adding new features to the iOS app',
      repository: 'https://github.com/example.com/example-service-b',
    },
  ],
  history: [
    {
      cognitiveLoad: 19,
      fte: 8,
      type: TeamType.STREAM_ALIGNED,
      changeNote: 'Mira left the company.',
      createdAt: new Date('2022-11-19'),
    },
    {
      cognitiveLoad: 19,
      fte: 9,
      type: TeamType.STREAM_ALIGNED,
      changeNote: 'Lena changed the project.',
      createdAt: new Date('2022-10-30'),
    },
    {
      cognitiveLoad: 19,
      fte: 10,
      type: TeamType.STREAM_ALIGNED,
      changeNote: 'Regular cognitive load check.',
      createdAt: new Date('2022-10-17'),
    },
    {
      cognitiveLoad: 11,
      fte: 10,
      type: TeamType.STREAM_ALIGNED,
      changeNote: 'Initial creation.',
      createdAt: new Date('2022-07-17'),
    },
  ],
  historyDomains: [
    {
      domains: ['Mobile App iOS', 'Mobile App Android'],
      changeNote: 'Added new responsibility.',
      createdAt: new Date('2022-09-23'),
    },
    {
      domains: ['Mobile App iOS'],
      changeNote: 'Initial creation.',
      createdAt: new Date('2022-07-17'),
    },
  ],
};

const productTeam = {
  id: '',
  name: 'Product Display Team',
  teamType: TeamType.STREAM_ALIGNED,
  domains: ['Product Catalogue'],
  fte: 5,
  cognitiveLoad: 21,
  platform: null,
  focus:
    'This team is focused on the logic of the product catalogue and its' +
    ' unique features to create an outstanding shopping experience.',
  wikiSearchTerms: ['product', 'shoppingPlatform', 'stream-aligned'],
  meetings: [
    {
      purpose: 'Daily sync',
      day: meetingsDay.DAILY,
      time: '9:00',
      durationMinutes: 15,
    },
  ],
  channels: [
    { type: channelTypes.SLACK, name: '#stream-aligned-team-product' },
    { type: channelTypes.SLACK, name: '#shopping-platform' },
  ],
  services: [],
  waysOfWorking: [
    {
      name: 'Scrum',
      url: 'https://scrumguides.org/',
    },
  ],
  workInProgress: [
    {
      summary: 'Working on the catalogue',
      repository: 'https://github.com/example.com/example-service-a',
    },
  ],
  history: [
    {
      cognitiveLoad: 21,
      fte: 5,
      type: TeamType.STREAM_ALIGNED,
      changeNote: 'Regular cognitive load check.',
      createdAt: new Date('2022-09-01'),
    },
    {
      cognitiveLoad: 10,
      fte: 5,
      type: TeamType.STREAM_ALIGNED,
      changeNote: 'Lisa joined the team.',
      createdAt: new Date('2022-08-10'),
    },
    {
      cognitiveLoad: 10,
      fte: 4,
      type: TeamType.STREAM_ALIGNED,
      changeNote: 'Initial creation.',
      createdAt: new Date('2022-06-01'),
    },
  ],
  historyDomains: [
    {
      domains: ['Product Catalogue'],
      changeNote: 'Initial creation.',
      createdAt: new Date('2022-06-01'),
    },
  ],
};

const gpsTeam = {
  id: '',
  name: 'GPS Experts Team',
  teamType: TeamType.COMPLICATED_SUBSYSTEM,
  domains: ['Product Catalogue'],
  fte: 2,
  cognitiveLoad: 15,
  platform: null,
  focus:
    'This team is focused around all GPS related functionality for' +
    ' displaying the right products at the right time and location to the' +
    ' customer.',
  wikiSearchTerms: ['product', 'shoppingPlatform', 'complicated-subsystem'],
  meetings: [
    {
      purpose: 'Daily sync',
      day: meetingsDay.DAILY,
      time: '10:00',
      durationMinutes: 15,
    },
  ],
  channels: [
    { type: channelTypes.SLACK, name: '#complicated-subsystem-team-gps' },
    { type: channelTypes.SLACK, name: '#shopping-platform' },
  ],
  services: [],
  waysOfWorking: [
    {
      name: 'Kanban',
      url: '',
    },
  ],
  workInProgress: [
    {
      summary: 'Working on the gps related parts of the catalogue',
      repository: 'https://github.com/example.com/example-service-a',
    },
  ],
  history: [
    {
      cognitiveLoad: 15,
      fte: 2,
      type: TeamType.COMPLICATED_SUBSYSTEM,
      changeNote:
        'Changed team type since this team only works on one part' +
        ' of the system right now.',
      createdAt: new Date('2022-11-09'),
    },
    {
      cognitiveLoad: 15,
      fte: 2,
      type: TeamType.ENABLING,
      changeNote: 'Regular cognitive load check.',
      createdAt: new Date('2022-09-01'),
    },
    {
      cognitiveLoad: 9,
      fte: 4,
      type: TeamType.ENABLING,
      changeNote: 'Initial creation.',
      createdAt: new Date('2022-06-01'),
    },
  ],
  historyDomains: [
    {
      domains: ['Product Catalogue'],
      changeNote: 'Focus on one domain only for now.',
      createdAt: new Date('2022-10-21'),
    },
    {
      domains: ['Shipping', 'Product Catalogue'],
      changeNote: 'Initial creation.',
      createdAt: new Date('2022-06-01'),
    },
  ],
};

const orderTeam = {
  id: '',
  name: 'Customer Order Team',
  teamType: TeamType.STREAM_ALIGNED,
  domains: ['Orders', 'Shipping', 'Inventory'],
  fte: 6,
  platform: null,
  cognitiveLoad: 15,
  focus: 'Working on everything related to ordering and shipping of products.',
  wikiSearchTerms: ['order', 'shipping', 'shoppingPlatform', 'stream-aligned'],
  meetings: [
    {
      purpose: 'Daily sync',
      day: meetingsDay.DAILY,
      time: '9:30',
      durationMinutes: 15,
    },
  ],
  channels: [
    { type: channelTypes.SLACK, name: '#stream-aligned-team-order' },
    { type: channelTypes.SLACK, name: '#shopping-platform' },
  ],
  waysOfWorking: [
    {
      name: 'Scrum',
      url: 'https://scrumguides.org/',
    },
  ],
  services: [
    {
      name: 'Current Inventory Retriever',
      url: 'https://github.com/example.com/example-service-c',
      repository: 'https://github.com/example.com/example-service-c',
      versioningType: versioningType.SEMANTIC,
    },
  ],
  workInProgress: [
    {
      summary: 'Implementing frequently ordered products to the order system.',
      repository: 'https://github.com/example.com/example-service-a',
    },
    {
      summary: 'Bug fixes for the shipping functionality.',
      repository: 'https://github.com/example.com/example-service-b',
    },
  ],
  history: [
    {
      cognitiveLoad: 15,
      fte: 6,
      type: TeamType.STREAM_ALIGNED,
      changeNote: 'Tom joined the team.',
      createdAt: new Date('2022-11-20'),
    },
    {
      cognitiveLoad: 15,
      fte: 5,
      type: TeamType.STREAM_ALIGNED,
      changeNote: 'Regular cognitive load check.',
      createdAt: new Date('2022-11-13'),
    },
    {
      cognitiveLoad: 18,
      fte: 5,
      type: TeamType.STREAM_ALIGNED,
      changeNote: 'Boris and Jonathan joined the team',
      createdAt: new Date('2022-09-10'),
    },
    {
      cognitiveLoad: 18,
      fte: 3,
      type: TeamType.STREAM_ALIGNED,
      changeNote: 'Initial creation.',
      createdAt: new Date('2022-08-13'),
    },
  ],
  historyDomains: [
    {
      domains: ['Orders', 'Shipping', 'Inventory'],
      changeNote: 'Taking over inventory for now.',
      createdAt: new Date('2022-10-21'),
    },
    {
      domains: ['Orders', 'Shipping'],
      changeNote: 'Initial creation.',
      createdAt: new Date('2022-08-13'),
    },
  ],
};

const paymentUndefinedTeam = {
  id: '',
  name: 'Payment Team',
  teamType: TeamType.UNDEFINED,
  domains: ['Payment'],
  fte: 3,
  cognitiveLoad: 11,
  platform: null,
  focus: 'Currently focusing on the payment system.',
  wikiSearchTerms: ['payment', 'shoppingPlatform'],
  meetings: [
    {
      purpose: 'Daily sync',
      day: meetingsDay.DAILY,
      time: '9:30',
      durationMinutes: 7,
    },
  ],
  channels: [
    { type: channelTypes.SLACK, name: '#undefined-team-payment' },
    { type: channelTypes.SLACK, name: '#shopping-platform' },
  ],
  waysOfWorking: [
    {
      name: 'Kanban',
      url: '',
    },
  ],
  services: [],
  workInProgress: [
    {
      summary:
        'Exploring possible payment solutions and implementing a' +
        ' prototype.',
      repository: 'https://github.com/example.com/example-service-a',
    },
  ],
  history: [
    {
      cognitiveLoad: 11,
      fte: 3,
      type: TeamType.UNDEFINED,
      changeNote:
        'Changed team type, since it is not sure if this team will' +
        ' continue as a stream-aligned team, as the domain changed.',
      createdAt: new Date('2022-11-01'),
    },
    {
      cognitiveLoad: 10,
      fte: 3,
      type: TeamType.STREAM_ALIGNED,
      changeNote: 'Initial creation',
      createdAt: new Date('2022-10-10'),
    },
  ],
  historyDomains: [
    {
      domains: ['Payment'],
      changeNote: 'Changed domain.',
      createdAt: new Date('2022-11-01'),
    },
    {
      domains: ['Inventory'],
      changeNote: 'Initial creation.',
      createdAt: new Date('2022-10-10'),
    },
  ],
};

const authTeam = {
  id: '',
  name: 'Auth Team',
  teamType: TeamType.STREAM_ALIGNED,
  domains: ['Authentication and Authorization', 'Customer Management'],
  fte: 2,
  cognitiveLoad: 19,
  platform: null,
  focus:
    'Everything needed for registration, login and authorization of our' +
    ' system users and customers.',
  wikiSearchTerms: ['authorization', 'authentication', 'shoppingPlatform'],
  meetings: [],
  channels: [
    { type: channelTypes.SLACK, name: '#complicated-subsystem-team-gps' },
    { type: channelTypes.SLACK, name: '#shopping-platform' },
  ],
  waysOfWorking: [
    {
      name: 'Kanban',
      url: '',
    },
  ],
  services: [],
  workInProgress: [
    {
      summary: 'Just getting started with setting up an authentication system',
      repository: 'https://github.com/example.com/example-service-a',
    },
  ],
  history: [
    {
      cognitiveLoad: 19,
      fte: 2,
      type: TeamType.STREAM_ALIGNED,
      changeNote: 'Initial cognitive load assessment.',
      createdAt: new Date('2022-11-03'),
    },
    {
      cognitiveLoad: 0,
      fte: 2,
      type: TeamType.STREAM_ALIGNED,
      changeNote: 'Initial creation',
      createdAt: new Date('2022-11-02'),
    },
  ],
  historyDomains: [
    {
      domains: ['Authentication and Authorization', 'Customer Management'],
      changeNote: 'Added new domain.',
      createdAt: new Date('2022-11-21'),
    },
    {
      domains: ['Authentication and Authorization'],
      changeNote: 'Initial creation.',
      createdAt: new Date('2022-11-02'),
    },
  ],
};

const uxTeam = {
  id: '',
  name: 'UI/UX Team',
  teamType: TeamType.ENABLING,
  domains: ['Mobile App iOS', 'Mobile App Android', 'Product Catalogue'],
  fte: 3,
  cognitiveLoad: 10,
  platform: null,
  focus: 'Helping with UI/UX Topics',
  wikiSearchTerms: ['ui-ux', 'shoppingPlatform', 'design'],
  meetings: [
    {
      purpose: 'Daily sync',
      day: meetingsDay.DAILY,
      time: '9:00',
      durationMinutes: 15,
    },
  ],
  channels: [
    { type: channelTypes.SLACK, name: '#enabling-team-ui-ux' },
    { type: channelTypes.SLACK, name: '#shopping-platform' },
  ],
  services: [
    {
      name: 'UI Component Library',
      url: 'https://example.com',
      repository: 'https://github.com/example.com/example-service-a',
      versioningType: versioningType.SEMANTIC,
    },
  ],
  waysOfWorking: [
    {
      name: 'Kanban',
    },
  ],
  workInProgress: [
    {
      summary: 'Constantly improving UI Component Library',
      repository: 'https://github.com/example.com/example-service-a',
    },
    {
      summary: 'Preparing internal UI/UX Workshops',
    },
  ],
  history: [
    {
      cognitiveLoad: 10,
      fte: 3,
      type: TeamType.ENABLING,
      changeNote: 'Regular cognitive load assessment.',
      createdAt: new Date('2022-11-11'),
    },
    {
      cognitiveLoad: 15,
      fte: 3,
      type: TeamType.ENABLING,
      changeNote: 'Johnny left again...',
      createdAt: new Date('2022-09-10'),
    },
    {
      cognitiveLoad: 15,
      fte: 4,
      type: TeamType.ENABLING,
      changeNote: 'Johnny joined as a new UX Designer.',
      createdAt: new Date('2022-08-23'),
    },
    {
      cognitiveLoad: 15,
      fte: 3,
      type: TeamType.ENABLING,
      changeNote:
        'Changed team type to reflect the actual responsibility of' +
        ' the team, as its helping others.',
      createdAt: new Date('2022-08-11'),
    },
    {
      cognitiveLoad: 15,
      fte: 3,
      type: TeamType.COMPLICATED_SUBSYSTEM,
      changeNote: 'Initial creation',
      createdAt: new Date('2022-07-02'),
    },
  ],
  historyDomains: [
    {
      domains: ['Product Catalogue', 'Mobile App iOS', 'Mobile App Android'],
      changeNote: 'Additional support for android app design.',
      createdAt: new Date('2022-09-10'),
    },
    {
      domains: ['Product Catalogue', 'Mobile App iOS'],
      changeNote: 'Also supports the team working on the mobile iOS app.',
      createdAt: new Date('2022-08-21'),
    },
    {
      domains: ['Product Catalogue'],
      changeNote: 'Initial creation.',
      createdAt: new Date('2022-07-02'),
    },
  ],
};

const createTeams = async (prisma: PrismaClient) => {
  const findDomain = async (name: string): Promise<Domain | undefined> => {
    const domains = await prisma.domain.findMany({ where: { name } });
    if (domains.length > 0) {
      return domains[0];
    }
    return;
  };

  const findTeam = async (name: string): Promise<Team | undefined> => {
    const teams = await prisma.team.findMany({ where: { name } });
    if (teams.length > 0) {
      return teams[0];
    }
    return;
  };

  const existingProject = await prisma.project.findMany({
    where: { name: 'Shopping platform' },
  });

  if (existingProject.length === 0) {
    return;
  }

  const teams = [
    infrastructureTeam,
    appTeam,
    productTeam,
    gpsTeam,
    orderTeam,
    paymentUndefinedTeam,
    authTeam,
    uxTeam,
  ];

  const createdTeams = [];

  for (let i = 0; i < teams.length; i++) {
    const existingTeam = await findTeam(teams[i].name);
    if (existingTeam) {
      continue;
    }
    const team = teams[i];
    const domainNames = team.domains;
    const domainsForTeam = [];
    for (let j = 0; j < domainNames.length; j++) {
      const retrievedDomain = await findDomain(domainNames[j]);
      domainsForTeam.push(retrievedDomain);
    }

    const createdTeam = await prisma.team.create({
      data: {
        project: { connect: { id: existingProject[0].id } },
        name: team.name,
        focus: team.focus,
        cognitiveLoad: team.cognitiveLoad,
        fte: team.fte,
        type: team.teamType,
        platform: team.platform,
        wikiSearchTerms: team.wikiSearchTerms,
        DomainsOnTeams: {
          create: domainsForTeam.map((domain) => ({ domainId: domain.id })),
        },
        CommunicationChannel: {
          create: team.channels.map((channel) => ({
            type: channel.type,
            name: channel.name,
          })),
        },
        Meeting: {
          create: team.meetings.map((meeting) => ({
            day: meeting.day,
            purpose: meeting.purpose,
            time: meeting.time,
            durationMinutes: meeting.durationMinutes,
          })),
        },
        Service: {
          create: team.services.map((service) => ({
            versioning: service.versioningType,
            url: service.url,
            name: service.name,
            repository: service.repository,
          })),
        },
        WayOfWorking: {
          create: team.waysOfWorking.map((way) => ({
            name: way.name,
            url: way.url,
          })),
        },
        Work: {
          create: team.workInProgress.map((work) => ({
            summary: work.summary,
            repository: work.repository,
          })),
        },
      },
    });

    await prisma.teamHistory.createMany({
      data: team.history.map((history) => ({
        teamId: createdTeam.id,
        createdAt: history.createdAt,
        type: history.type,
        cognitiveLoad: history.cognitiveLoad,
        fte: history.fte,
        changeNote: history.changeNote,
      })),
    });

    for (let k = 0; k < team.historyDomains.length; k++) {
      const historyDomainIds = [];
      for (let l = 0; l < team.historyDomains[k].domains.length; l++) {
        const domain = await findDomain(team.historyDomains[k].domains[l]);
        historyDomainIds.push(domain.id);
      }

      await prisma.domainsOnTeamsHistory.createMany({
        data: historyDomainIds.map((domainId) => ({
          teamId: createdTeam.id,
          domainId: domainId,
          createdAt: team.historyDomains[k].createdAt,
          changeNote: team.historyDomains[k].changeNote,
        })),
      });
    }

    createdTeams.push(createdTeam);
    teams[i].id = createdTeam.id;
  }

  console.log('Created teams: ', { createdTeams });

  const dependencies = [
    {
      fromTeamId: authTeam.id,
      toTeamId: infrastructureTeam.id,
      dependencyType: dependencyType.SLOWING,
      description:
        'We need some onboarding on the deployment services so we' +
        ' can start with our features.',
    },
    {
      fromTeamId: productTeam.id,
      toTeamId: infrastructureTeam.id,
      dependencyType: dependencyType.OK,
      description:
        'First use of the logging service and we need some support,' +
        ' but seems to be fine right now.',
    },
    {
      fromTeamId: paymentUndefinedTeam.id,
      toTeamId: orderTeam.id,
      dependencyType: dependencyType.BLOCKING,
      description:
        'We need the new checkout feature to be done before we can update' +
        ' the payment methods.',
    },
  ];

  const dependencyHistories = [
    // auth to infra
    {
      dependency: {
        fromTeamId: authTeam.id,
        toTeamId: infrastructureTeam.id,
        dependencyType: dependencyType.SLOWING,
        description:
          'We need some onboarding on the deployment services so we' +
          ' can start with our features.',
      },
      changeType: changeType.CHANGED,
      createdAt: new Date('2022-11-20'),
      changeNote: 'Dependency is really slowing us now.',
    },
    {
      dependency: {
        fromTeamId: authTeam.id,
        toTeamId: infrastructureTeam.id,
        dependencyType: dependencyType.OK,
        description:
          'We need some onboarding on the deployment services so we' +
          ' can start with our features.',
      },
      changeType: changeType.CHANGED,
      createdAt: new Date('2022-11-10'),
      changeNote: 'Added dependency.',
    },
    // product to infra
    {
      dependency: {
        fromTeamId: productTeam.id,
        toTeamId: infrastructureTeam.id,
        dependencyType: dependencyType.OK,
        description:
          'First use of the logging service and we need some support,' +
          ' but seems to be fine right now.',
      },
      changeType: changeType.ADDED,
      createdAt: new Date('2022-10-09'),
      changeNote: 'Added dependency to reflect needed support.',
    },
    // payment to order
    {
      dependency: {
        fromTeamId: paymentUndefinedTeam.id,
        toTeamId: orderTeam.id,
        dependencyType: dependencyType.BLOCKING,
        description:
          'We need the new checkout feature to be done before we can update' +
          ' the payment methods.',
      },
      changeType: changeType.ADDED,
      createdAt: new Date('2022-11-20'),
      changeNote: 'Added dependency for newly planned feature.',
    },
    // product to ux
    {
      dependency: {
        fromTeamId: productTeam.id,
        toTeamId: uxTeam.id,
        dependencyType: dependencyType.SLOWING,
        description: 'We need new components for the product display.',
      },
      changeType: changeType.REMOVED,
      createdAt: new Date('2022-10-08'),
      changeNote: 'Removed dependency as it is resolved now.',
    },
    {
      dependency: {
        fromTeamId: productTeam.id,
        toTeamId: uxTeam.id,
        dependencyType: dependencyType.SLOWING,
        description: 'We need new components for the product display.',
      },
      changeType: changeType.CHANGED,
      createdAt: new Date('2022-09-28'),
      changeNote: 'Dependency is slowing us now.',
    },
    {
      dependency: {
        fromTeamId: productTeam.id,
        toTeamId: uxTeam.id,
        dependencyType: dependencyType.OK,
        description: 'We need new components for the product display.',
      },
      changeType: changeType.ADDED,
      createdAt: new Date('2022-09-08'),
      changeNote: 'Added dependency because a new feature is planned.',
    },
    // app to ux
    {
      dependency: {
        fromTeamId: appTeam.id,
        toTeamId: uxTeam.id,
        dependencyType: dependencyType.OK,
        description: 'We need new components for the app navigation in iOS.',
      },
      changeType: changeType.REMOVED,
      createdAt: new Date('2022-09-14'),
      changeNote: 'Removed dependency as it is resolved now.',
    },
    {
      dependency: {
        fromTeamId: appTeam.id,
        toTeamId: uxTeam.id,
        dependencyType: dependencyType.OK,
        description: 'We need new components for the app navigation in iOS.',
      },
      changeType: changeType.ADDED,
      createdAt: new Date('2022-09-08'),
      changeNote: 'Add dependency.',
    },
    // gps to product
    {
      dependency: {
        fromTeamId: gpsTeam.id,
        toTeamId: productTeam.id,
        dependencyType: dependencyType.OK,
        description:
          'Some onboarding on the new repository structure is needed.',
      },
      changeType: changeType.REMOVED,
      createdAt: new Date('2022-09-07'),
      changeNote: 'Removed dependency.',
    },
    {
      dependency: {
        fromTeamId: gpsTeam.id,
        toTeamId: productTeam.id,
        dependencyType: dependencyType.OK,
        description:
          'Some onboarding on the new repository structure is needed.',
      },
      changeType: changeType.ADDED,
      createdAt: new Date('2022-09-03'),
      changeNote: 'Added dependency.',
    },

    // old ux to product dependency
    {
      dependency: {
        fromTeamId: authTeam.id,
        toTeamId: productTeam.id,
        dependencyType: dependencyType.BLOCKING,
        description: 'Onboarding needed to understand requirements.',
      },
      changeType: changeType.REMOVED,
      createdAt: new Date('2022-07-21'),
      changeNote: 'Removed dependency.',
    },
    {
      dependency: {
        fromTeamId: authTeam.id,
        toTeamId: productTeam.id,
        dependencyType: dependencyType.BLOCKING,
        description: 'Onboarding needed to understand requirements.',
      },
      changeType: changeType.ADDED,
      createdAt: new Date('2022-07-09'),
      changeNote: 'Added dependency.',
    },
  ];

  const createdDependencies = [];
  const createdDependencyHistories = [];
  for (let i = 0; i < dependencies.length; i++) {
    const currentDependency = dependencies[i];

    const createdDependency = await prisma.dependency.create({
      data: {
        teamFrom: { connect: { id: currentDependency.fromTeamId } },
        teamTo: { connect: { id: currentDependency.toTeamId } },
        dependencyType: currentDependency.dependencyType,
        description: currentDependency.description,
      },
    });

    createdDependencies.push(createdDependency);
  }
  for (let i = 0; i < dependencyHistories.length; i++) {
    const currentHistoryDependency = dependencyHistories[i];

    const createdDependency = await prisma.dependencyHistory.create({
      data: {
        teamFrom: {
          connect: { id: currentHistoryDependency.dependency.fromTeamId },
        },
        teamTo: {
          connect: { id: currentHistoryDependency.dependency.toTeamId },
        },
        dependencyType: currentHistoryDependency.dependency.dependencyType,
        description: currentHistoryDependency.dependency.description,
        changeNote: currentHistoryDependency.changeNote,
        createdAt: currentHistoryDependency.createdAt,
        changeType: currentHistoryDependency.changeType,
      },
    });

    createdDependencyHistories.push(createdDependency);
  }

  console.log('Created dependencies: ', { createdDependencies });
  console.log('Created dependency histories: ', { createdDependencyHistories });

  const interactions = [
    {
      teamIdOne: infrastructureTeam.id,
      teamIdTwo: appTeam.id,
      interactionMode: interactionMode.X_AS_A_SERVICE,
      purpose: 'Using the deployment service of the infrastructure team.',
      startDate: new Date('2022-11-05'),
      expectedDuration: 12,
      additionalNotes:
        'Interaction is expected to last longer, but we' +
        ' should reevaluate after 12 weeks.',
    },
    {
      teamIdOne: infrastructureTeam.id,
      teamIdTwo: productTeam.id,
      interactionMode: interactionMode.X_AS_A_SERVICE,
      purpose:
        'Using the deployment and logging service of the' +
        ' infrastructure team.',
      startDate: new Date('2022-11-05'),
      expectedDuration: 12,
      additionalNotes:
        'Interaction is expected to last longer, but we' +
        ' should reevaluate after 12 weeks.',
    },
    {
      teamIdOne: infrastructureTeam.id,
      teamIdTwo: orderTeam.id,
      interactionMode: interactionMode.X_AS_A_SERVICE,
      purpose: 'Using the deployment service of the infrastructure team.',
      startDate: new Date('2022-10-13'),
      expectedDuration: 12,
      additionalNotes:
        'Interaction is expected to last longer, but we' +
        ' should reevaluate after 12 weeks.',
    },
    {
      teamIdOne: uxTeam.id,
      teamIdTwo: appTeam.id,
      interactionMode: interactionMode.FACILITATING,
      purpose: 'Helping to get the design right.',
      startDate: new Date('2022-10-13'),
      expectedDuration: 8,
      additionalNotes: 'Initial onboarding for design specific reasons.',
    },
    {
      teamIdOne: uxTeam.id,
      teamIdTwo: productTeam.id,
      interactionMode: interactionMode.FACILITATING,
      purpose: 'Helping with the new product display.',
      startDate: new Date('2022-11-13'),
      expectedDuration: 4,
      additionalNotes: 'Making sure the product display will look beautiful.',
    },
    {
      teamIdOne: uxTeam.id,
      teamIdTwo: orderTeam.id,
      interactionMode: interactionMode.FACILITATING,
      purpose:
        'Helping with new checkout design as soon as the feature is' +
        ' planned.',
      startDate: new Date('2023-03-10'),
      expectedDuration: 8,
      additionalNotes: '',
    },
    {
      teamIdOne: gpsTeam.id,
      teamIdTwo: productTeam.id,
      interactionMode: interactionMode.COLLABORATION,
      purpose:
        'Figuring out the gps data functionality for displaying' +
        ' products with the new feature.',
      startDate: new Date('2022-11-13'),
      expectedDuration: 5,
      additionalNotes: 'Intense work expected.',
    },
    {
      teamIdOne: authTeam.id,
      teamIdTwo: infrastructureTeam.id,
      interactionMode: interactionMode.COLLABORATION,
      purpose:
        'Exploring the boundaries between infrastructure and authentication.',
      startDate: new Date('2022-11-13'),
      expectedDuration: 2,
      additionalNotes:
        'The authentication team is newly created and also' +
        ' needs some onboarding.',
    },
  ];

  const interactionsHistory = [
    // infra and app
    {
      teamIdOne: infrastructureTeam.id,
      teamIdTwo: appTeam.id,
      interactionMode: interactionMode.X_AS_A_SERVICE,
      purpose: 'Using the deployment service of the infrastructure team.',
      startDate: new Date('2022-11-05'),
      expectedDuration: 12,
      additionalNotes:
        'Interaction is expected to last longer, but we' +
        ' should reevaluate after 12 weeks.',
      createdAt: new Date('2022-10-20'),
      changeType: changeType.ADDED,
      changeNote:
        'Added interaction as the new deployment service will be used soon.',
    },

    // infra and product
    {
      teamIdOne: infrastructureTeam.id,
      teamIdTwo: productTeam.id,
      interactionMode: interactionMode.X_AS_A_SERVICE,
      purpose:
        'Using the deployment and logging service of the' +
        ' infrastructure team.',
      startDate: new Date('2022-11-05'),
      expectedDuration: 12,
      additionalNotes:
        'Interaction is expected to last longer, but we' +
        ' should reevaluate after 12 weeks.',
      createdAt: new Date('2022-10-20'),
      changeType: changeType.CHANGED,
      changeNote:
        'Changed interaction as the new deployment service will be used now' +
        ' as a service.',
    },
    {
      teamIdOne: infrastructureTeam.id,
      teamIdTwo: productTeam.id,
      interactionMode: interactionMode.COLLABORATION,
      purpose:
        'Working together to get to know all requirements for the deployment' +
        ' service.',
      startDate: new Date('2022-09-02'),
      expectedDuration: 8,
      additionalNotes: 'Need to focus to get it done soon.',
      createdAt: new Date('2022-08-30'),
      changeType: changeType.ADDED,
      changeNote: 'Added interaction mode.',
    },

    // infra and order
    {
      teamIdOne: infrastructureTeam.id,
      teamIdTwo: orderTeam.id,
      interactionMode: interactionMode.X_AS_A_SERVICE,
      purpose: 'Using the deployment service of the infrastructure team.',
      startDate: new Date('2022-11-13'),
      expectedDuration: 12,
      additionalNotes:
        'Interaction is expected to last longer, but we' +
        ' should reevaluate after 12 weeks.',
      createdAt: new Date('2022-11-02'),
      changeType: changeType.ADDED,
      changeNote: 'Added interaction mode.',
    },

    // ux and app
    {
      teamIdOne: uxTeam.id,
      teamIdTwo: appTeam.id,
      interactionMode: interactionMode.FACILITATING,
      purpose: 'Helping to get the design right.',
      startDate: new Date('2022-10-13'),
      expectedDuration: 8,
      additionalNotes: 'Initial onboarding for design specific reasons.',
      createdAt: new Date('2022-10-13'),
      changeType: changeType.ADDED,
      changeNote: 'Added interaction mode.',
    },

    // ux and product
    {
      teamIdOne: uxTeam.id,
      teamIdTwo: productTeam.id,
      interactionMode: interactionMode.FACILITATING,
      purpose: 'Helping with the new product display.',
      startDate: new Date('2022-11-13'),
      expectedDuration: 4,
      additionalNotes: 'Making sure the product display will look beautiful.',
      createdAt: new Date('2022-11-10'),
      changeType: changeType.ADDED,
      changeNote: 'Added interaction mode.',
    },
    {
      teamIdOne: uxTeam.id,
      teamIdTwo: productTeam.id,
      interactionMode: interactionMode.FACILITATING,
      purpose: 'Helping with the styling of the product detail view.',
      startDate: new Date('2022-11-13'),
      expectedDuration: 4,
      additionalNotes: 'Trying to also teach some design principles.',
      createdAt: new Date('2022-09-05'),
      changeType: changeType.REMOVED,
      changeNote:
        'Removed interaction mode as the feature is done and the' +
        ' team can continue on its own.',
    },
    {
      teamIdOne: uxTeam.id,
      teamIdTwo: productTeam.id,
      interactionMode: interactionMode.FACILITATING,
      purpose: 'Helping with the styling of the product detail view.',
      startDate: new Date('2022-11-13'),
      expectedDuration: 4,
      additionalNotes: 'Trying to also teach some design principles.',
      createdAt: new Date('2022-08-01'),
      changeType: changeType.ADDED,
      changeNote: 'Added interaction mode.',
    },

    // ux and order
    {
      teamIdOne: uxTeam.id,
      teamIdTwo: orderTeam.id,
      interactionMode: interactionMode.FACILITATING,
      purpose:
        'Helping with new checkout design as soon as the feature is' +
        ' planned.',
      startDate: new Date('2023-03-10'),
      expectedDuration: 8,
      additionalNotes: '',
      createdAt: new Date('2022-11-23'),
      changeType: changeType.ADDED,
      changeNote: 'Added expected interaction mode.',
    },

    // gps and product
    {
      teamIdOne: gpsTeam.id,
      teamIdTwo: productTeam.id,
      interactionMode: interactionMode.COLLABORATION,
      purpose:
        'Figuring out the gps data functionality for displaying' +
        ' products with the new feature.',
      startDate: new Date('2022-11-13'),
      expectedDuration: 5,
      additionalNotes: 'Intense work expected.',
      createdAt: new Date('2022-11-23'),
      changeType: changeType.CHANGED,
      changeNote:
        'Prelonged the interaction, as it seems to take longer' +
        ' than expected.',
    },
    {
      teamIdOne: gpsTeam.id,
      teamIdTwo: productTeam.id,
      interactionMode: interactionMode.COLLABORATION,
      purpose:
        'Figuring out the gps data functionality for displaying' +
        ' products with the new feature.',
      startDate: new Date('2022-11-13'),
      expectedDuration: 2,
      additionalNotes: 'Intense work expected.',
      createdAt: new Date('2022-11-07'),
      changeType: changeType.ADDED,
      changeNote: 'Add interaction mode.',
    },

    // auth and infra
    {
      teamIdOne: authTeam.id,
      teamIdTwo: infrastructureTeam.id,
      interactionMode: interactionMode.COLLABORATION,
      purpose:
        'Exploring the boundaries between infrastructure and authentication.',
      startDate: new Date('2022-11-13'),
      expectedDuration: 2,
      additionalNotes:
        'The authentication team is newly created and also' +
        ' needs some onboarding.',
      createdAt: new Date('2022-11-07'),
      changeType: changeType.ADDED,
      changeNote: 'Add interaction mode.',
    },
  ];

  const createdInteractions = [];
  const createdInteractionHistory = [];
  for (let i = 0; i < interactions.length; i++) {
    const currentInteraction = interactions[i];

    const createdInteraction = await prisma.interaction.create({
      data: {
        teamOne: { connect: { id: currentInteraction.teamIdOne } },
        teamTwo: { connect: { id: currentInteraction.teamIdTwo } },
        interactionMode: currentInteraction.interactionMode,
        purpose: currentInteraction.purpose,
        startDate: currentInteraction.startDate,
        expectedDuration: currentInteraction.expectedDuration,
        additionalInformation: currentInteraction.additionalNotes,
      },
    });

    createdInteractions.push(createdInteraction);
  }

  for (let i = 0; i < interactionsHistory.length; i++) {
    const currentHistory = interactionsHistory[i];

    const createdHistory = await prisma.interactionHistory.create({
      data: {
        teamOne: { connect: { id: currentHistory.teamIdOne } },
        teamTwo: { connect: { id: currentHistory.teamIdTwo } },
        interactionMode: currentHistory.interactionMode,
        purpose: currentHistory.purpose,
        startDate: currentHistory.startDate,
        expectedDuration: currentHistory.expectedDuration,
        additionalInformation: currentHistory.additionalNotes,
        createdAt: currentHistory.createdAt,
        changeType: currentHistory.changeType,
        changeNote: currentHistory.changeNote,
      },
    });

    createdInteractionHistory.push(createdHistory);
  }

  console.log('Created interactions: ', { createdInteractions });
  console.log('Created interaction history: ', { createdInteractionHistory });
};

export default createTeams;
