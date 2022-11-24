import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Dependency, DependencyHistory } from '@prisma/client';

@Injectable()
export class DependenciesService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Dependency[]> {
    return this.prisma.dependency.findMany({
      include: { teamFrom: true, teamTo: true },
    });
  }

  findAllHistoric(): Promise<DependencyHistory[]> {
    return this.prisma.dependencyHistory.findMany({
      include: { teamFrom: true, teamTo: true },
    });
  }
}
