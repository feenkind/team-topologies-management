import { PrismaClient } from '@prisma/client';

const createTeams = async (prisma: PrismaClient) => {
  const existingProject = await prisma.project.findMany({
    where: { name: 'Shopping platform' },
  });

  if (existingProject.length === 0) {
    return;
  }
};

export default createTeams;
