import { PrismaClient } from '@prisma/client';
import createProjects from './projectSeed';
import createDomains from './domainSeed';
import createTeams from './teamSeed';
import createNotifications from './notificationSeed';

const prisma = new PrismaClient();

async function main() {
  await createProjects(prisma);
  await createDomains(prisma);
  await createTeams(prisma);
  await createNotifications(prisma);
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
