import { Test, TestingModule } from '@nestjs/testing';
import { DomainsController } from './domains.controller';
import { DomainsService } from './domains.service';
import { PrismaService } from '../prisma.service';

describe('DomainController', () => {
  let controller: DomainsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DomainsController],
      providers: [DomainsService, PrismaService],
    }).compile();

    controller = module.get<DomainsController>(DomainsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
