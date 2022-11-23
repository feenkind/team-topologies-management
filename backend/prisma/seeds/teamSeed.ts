import { Domain, Team, PrismaClient } from '@prisma/client';
import {
  channelTypes,
  meetingsDay,
  TeamType,
  versioningType,
} from '../../src/teams/dto/create-team.dto';

const infrastructureTeam = {
  name: 'Infrastructure Team',
  teamType: TeamType.PLATFORM,
  domains: ['Infrastructure'],
  fte: 4,
  cognitiveLoad: 18,
  focus:
    'The infrastructure team is responsible for building and' +
    ' maintaining the shopping platform infrastructure',
  platform: 'Shopping Platform Infrastructure',
  wikiSearchTerms: ['infrastrucutre', 'shoppingPlatform', 'platform'],
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
      repository: 'https://github.com/example.com/example-service-a',
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

  const domainInfrastructure = await findDomain('Infrastructure');
  const exitingTeam = await findTeam('Infrastructure Team');
  if (domainInfrastructure && !exitingTeam) {
    const createdTeam = await prisma.team.create({
      data: {
        project: { connect: { id: existingProject[0].id } },
        name: infrastructureTeam.name,
        focus: infrastructureTeam.focus,
        cognitiveLoad: infrastructureTeam.cognitiveLoad,
        fte: infrastructureTeam.fte,
        type: infrastructureTeam.teamType,
        platform: infrastructureTeam.platform,
        wikiSearchTerms: infrastructureTeam.wikiSearchTerms,
        DomainsOnTeams: { create: [{ domainId: domainInfrastructure.id }] },
        CommunicationChannel: {
          create: infrastructureTeam.channels.map((channel) => ({
            type: channel.type,
            name: channel.name,
          })),
        },
        Meeting: {
          create: infrastructureTeam.meetings.map((meeting) => ({
            day: meeting.day,
            purpose: meeting.purpose,
            time: meeting.time,
            durationMinutes: meeting.durationMinutes,
          })),
        },
        Service: {
          create: infrastructureTeam.services.map((service) => ({
            versioning: service.versioningType,
            url: service.url,
            name: service.name,
            repository: service.repository,
          })),
        },
        WayOfWorking: {
          create: infrastructureTeam.waysOfWorking.map((way) => ({
            name: way.name,
            url: way.url,
          })),
        },
        Work: {
          create: infrastructureTeam.workInProgress.map((work) => ({
            summary: work.summary,
            repository: work.repository,
          })),
        },
        TeamHistory: {
          create: {
            changeNote: 'Initial creation.',
            cognitiveLoad: infrastructureTeam.cognitiveLoad,
            fte: infrastructureTeam.fte,
            type: infrastructureTeam.teamType,
          },
        },
      },
    });

    console.log('Created team: ', { createdTeam });
  }
};

export default createTeams;
