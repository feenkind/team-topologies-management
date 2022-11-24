import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DependenciesService {
  constructor(private prisma: PrismaService) {}
}
