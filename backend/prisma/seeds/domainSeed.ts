import { PrismaClient } from '@prisma/client';

const domains = [
  {
    name: 'Mobile App iOS',
    description:
      'All about the iOS app. Currently this app is progrmamed in Swift.' +
      ' Technical responsibles are John and Paula.',
  },
  {
    name: 'Mobile App Android',
    description:
      'This domain is focused on the android application. Technically' +
      ' responsible is Eric.',
  },
  {
    name: 'Product Catalogue',
    description:
      'The product catalogue on the' +
      ' website that can be searched by customers. Technical responsibles:' +
      ' Adrian and Tom',
  },
  {
    name: 'Orders',
    description:
      'All functionality needed for placing' +
      ' orders in the shopping system. Contact person is Janine.',
  },
  {
    name: 'Payment',
    description:
      'This domain includes all payment related' +
      ' functionality. Might be splitted in the future, if more payment' +
      ' methods will be accepted. Contact person: Alfred.',
  },
  {
    name: 'Shipping',
    description:
      'Responsibility of this domain is the' +
      ' shipping and delivery functionality of the shopping platform.' +
      ' Technical responsibles: Jan and Thomas.',
  },
  {
    name: 'Inventory',
    description:
      'Keeping track of products and their' +
      ' inventory status. Responsibles: Jana and Clara.',
  },
  {
    name: 'Customer Management',
    description:
      'All about account creation,' +
      ' update and deletion. Currently no technical responsibles, please' +
      ' approach the team.',
  },
  {
    name: 'Authentication and Authorization',
    description:
      'Authentication' +
      ' and authorization' +
      ' for customers and administrators. Contact Torsten or Michael for' +
      ' more information.',
  },
  {
    name: 'Infrastructure',
    description:
      'Underlying infrastructure for the' +
      ' web application. Might need to be splitted soon. Technical' +
      ' responsible: Hannah and Julia.',
  },
];

const createDomains = async (prisma: PrismaClient) => {
  const existingProject = await prisma.project.findMany({
    where: { name: 'Shopping platform' },
  });

  if (!existingProject) {
    return;
  }

  const domains = await prisma.domain.createMany({
    data: [],
  });

  console.log(`Created following domains: `, {
    domains,
  });
};

export default createDomains;
