import { Domain, Team, PrismaClient } from '@prisma/client';
import { TeamType } from '../../src/teams/dto/create-team.dto';

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
  wikiSearchTerms: ['infrastrucutre', 'shoppingPlatform'],
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
    await prisma.team.create({
      data: {
        project: { connect: { id: existingProject[0].id } },
        name: infrastructureTeam.name,
        focus: infrastructureTeam.focus,
        cognitiveLoad: infrastructureTeam.cognitiveLoad,
        fte: infrastructureTeam.fte,
        type: infrastructureTeam.teamType,
      },
    });
  }
};

export default createTeams;
