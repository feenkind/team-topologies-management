import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PrismaService } from '../prisma.service';
import { DependenciesService } from './dependencies.service';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, PrismaService, DependenciesService],
})
export class TeamsModule {}
