import { Prisma, PrismaClient, Project } from '@prisma/client';

enum priority {
  GENERIC = 'generic',
  SUPPORTING = 'supporting',
  CORE = 'core',
}

enum complexity {
  SIMPLE = 'simple',
  COMPLICATED = 'complicated',
  COMPLEX = 'complex',
}

const createDomainData = (project: Project): Prisma.DomainCreateManyInput[] => {
  return [
    {
      name: 'Mobile App iOS',
      description:
        'All about the iOS app. Currently this app is progrmamed in Swift.' +
        ' Technical responsibles are John and Paula.',
      priority: priority.SUPPORTING,
      complexity: complexity.COMPLICATED,
      active: true,
      projectId: project.id,
    },
    {
      name: 'Mobile App Android',
      description:
        'This domain is focused on the android application. Technically' +
        ' responsible is Eric.',
      priority: priority.SUPPORTING,
      complexity: complexity.COMPLICATED,
      active: true,
      projectId: project.id,
    },
    {
      name: 'Product Catalogue',
      description:
        'The product catalogue on the' +
        ' website that can be searched by customers. Technical responsibles:' +
        ' Adrian and Tom',
      priority: priority.CORE,
      complexity: complexity.COMPLEX,
      active: true,
      projectId: project.id,
    },
    {
      name: 'Orders',
      description:
        'All functionality needed for placing' +
        ' orders in the shopping system. Contact person is Janine.',
      priority: priority.SUPPORTING,
      complexity: complexity.COMPLICATED,
      active: true,
      projectId: project.id,
    },
    {
      name: 'Payment',
      description:
        'This domain includes all payment related' +
        ' functionality. Might be splitted in the future, if more payment' +
        ' methods will be accepted. Contact person: Alfred.',
      priority: priority.GENERIC,
      complexity: complexity.COMPLICATED,
      active: true,
      projectId: project.id,
    },
    {
      name: 'Shipping',
      description:
        'Responsibility of this domain is the' +
        ' shipping and delivery functionality of the shopping platform.' +
        ' Technical responsibles: Jan and Thomas.',
      priority: priority.GENERIC,
      complexity: complexity.SIMPLE,
      active: true,
      projectId: project.id,
    },
    {
      name: 'Inventory',
      description:
        'Keeping track of products and their' +
        ' inventory status. Responsibles: Jana and Clara.',
      priority: priority.GENERIC,
      complexity: complexity.SIMPLE,
      active: true,
      projectId: project.id,
    },
    {
      name: 'Customer Management',
      description:
        'All about account creation,' +
        ' update and deletion. Currently no technical responsibles, please' +
        ' approach the team.',
      priority: priority.SUPPORTING,
      complexity: complexity.COMPLICATED,
      active: true,
      projectId: project.id,
    },
    {
      name: 'Authentication and Authorization',
      description:
        'Authentication' +
        ' and authorization' +
        ' for customers and administrators. Contact Torsten or Michael for' +
        ' more information.',
      priority: priority.GENERIC,
      complexity: complexity.COMPLEX,
      active: true,
      projectId: project.id,
    },
    {
      name: 'Infrastructure',
      description:
        'Underlying infrastructure for the' +
        ' web application. Might need to be splitted soon. Technical' +
        ' responsible: Hannah and Julia.',
      priority: priority.SUPPORTING,
      complexity: complexity.COMPLEX,
      active: true,
      projectId: project.id,
    },
  ];
};

const createDomains = async (prisma: PrismaClient) => {
  const existingProject = await prisma.project.findMany({
    where: { name: 'Shopping platform' },
  });

  if (!existingProject) {
    return;
  }

  const existingDomains = await prisma.domain.findMany({
    where: { project: existingProject[0] },
  });

  if (existingDomains.length > 0) {
    return;
  }

  const domainData = createDomainData(existingProject[0]);
  await prisma.domain.createMany({
    data: domainData,
  });
  const domains = await prisma.domain.findMany({
    where: { project: existingProject[0] },
  });
  const domainHistoryDataInitial: Prisma.DomainHistoryCreateManyInput[] =
    domains.map((domain) => ({
      domainId: domain.id,
      changeNote: 'Initial creation.',
      name: domain.name,
      description: '',
      priority: priority.GENERIC,
      complexity: complexity.SIMPLE,
      createdAt: new Date('2022-05-10'),
    }));
  const domainHistoryDataCurrent: Prisma.DomainHistoryCreateManyInput[] =
    domains.map((domain) => ({
      domainId: domain.id,
      changeNote: 'Updated description, priority and complexity.',
      name: domain.name,
      description: domain.description,
      priority: domain.priority,
      complexity: domain.complexity,
      createdAt: new Date('2022-10-10'),
    }));
  await prisma.domainHistory.createMany({
    data: [...domainHistoryDataInitial, ...domainHistoryDataCurrent],
  });

  console.log(`Created following domains: `, {
    domains,
  });
};

export default createDomains;
