import { Test, TestingModule } from '@nestjs/testing';
import { DomainsService } from './domains.service';
import { PrismaService } from '../prisma.service';

describe('DomainService', () => {
  let service: DomainsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainsService, PrismaService],
    }).compile();

    service = module.get<DomainsService>(DomainsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
