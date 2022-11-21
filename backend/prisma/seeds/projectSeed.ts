import { PrismaClient } from '@prisma/client';

const createProjects = async (prisma: PrismaClient) => {
  const existingProject = await prisma.project.findMany({
    where: { name: 'Shopping platform' },
  });

  if (existingProject.length > 0) {
    return;
  }

  const project = await prisma.project.create({
    data: {
      name: 'Shopping platform',
      description:
        'Some context for test project. Lorem ipsum dolor sit amet,' +
        ' consetetur sadipscing elitr, sed diam nonumy eirmod tempor' +
        ' invidunt ut labore et dolore magna aliquyam erat, sed diam' +
        ' voluptua. At vero eos et accusam et justo duo dolores et ea' +
        ' rebum. Stet clita kasd gubergren, no sea takimata sanctus est' +
        ' Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,' +
        ' consetetur sadipscing elitr, sed dia nonumy eirmod tempor' +
        ' invidunt ut labore et dolore magna aliquyam erat, sed diam' +
        ' voluptua. At vero eos et accusam et justo duo dolores et ea' +
        ' rebum. Stet clita kasd gubergren, no sea takimata sanctus est' +
        ' Lorem ipsum dolor sit amet.',
    },
  });

  console.log('Created 1 project: ', {
    project,
  });
};

export default createProjects;
