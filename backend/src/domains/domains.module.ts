import { Module } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { DomainsController } from './domains.controller';
import { PrismaService } from '../prisma.service';
import { ProjectsService } from '../projects/projects.service';

@Module({
  controllers: [DomainsController],
  providers: [DomainsService, PrismaService, ProjectsService],
})
export class DomainsModule {}
