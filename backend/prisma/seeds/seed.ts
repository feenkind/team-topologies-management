import { PrismaClient } from '@prisma/client';
import createProjects from './projectSeed';
import createDomains from './domainSeed';

const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  await createProjects(prisma);
  await createDomains(prisma);
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
