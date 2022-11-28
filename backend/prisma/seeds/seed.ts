import { PrismaClient } from '@prisma/client';
import createProjects from './projectSeed';
import createDomains from './domainSeed';
import createTeams from './teamSeed';

const prisma = new PrismaClient();

async function main() {
  await createProjects(prisma);
  await createDomains(prisma);
  await createTeams(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
