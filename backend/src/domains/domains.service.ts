import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DomainDto } from './dto/domain.dto';
import { complexity, CreateDomainDto, priority } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';

@Injectable()
export class DomainsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDomainDto: CreateDomainDto): Promise<DomainDto> {
    const domain = await this.prisma.domain.create({
      data: {
        name: createDomainDto.name,
        description: createDomainDto.description,
        priority: createDomainDto.priority,
        complexity: createDomainDto.complexity,
        project: { connect: { id: createDomainDto.projectId } },
        domainHistory: {
          create: [
            {
              name: createDomainDto.name,
              description: createDomainDto.description,
              priority: createDomainDto.priority,
              complexity: createDomainDto.complexity,
              changeNote: 'Initial creation.',
            },
          ],
        },
      },
    });

    return this.findOne(domain.id);
  }

  async findAll(): Promise<DomainDto[]> {
    const domains = await this.prisma.domain.findMany({
      include: { domainHistory: true },
    });

    return domains.map((domain) => ({
      id: domain.id,
      projectId: domain.projectId,
      name: domain.name,
      description: domain.description,
      priority: domain.priority as priority,
      complexity: domain.complexity as complexity,
      domainHistory: domain.domainHistory.map((history) => ({
        name: history.name,
        description: history.description,
        priority: history.priority as priority,
        complexity: history.complexity as complexity,
        createdAt: history.createdAt.toUTCString(),
        changeNote: history.changeNote,
      })),
    }));
  }

  async findOne(id: string): Promise<DomainDto> {
    const domain = await this.prisma.domain.findUnique({ where: { id } });
    return domain
      ? {
          id: domain.id,
          projectId: domain.projectId,
          name: domain.name,
          description: domain.description,
          priority: domain.priority as priority,
          complexity: domain.complexity as complexity,
        }
      : null;
  }

  async update(
    id: string,
    updateDomainDto: UpdateDomainDto,
  ): Promise<DomainDto> {
    await this.prisma.domain.update({
      data: {
        name: updateDomainDto.name,
        description: updateDomainDto.description,
        priority: updateDomainDto.priority,
        complexity: updateDomainDto.complexity,
        domainHistory: {
          create: [
            {
              name: updateDomainDto.name,
              description: updateDomainDto.description,
              priority: updateDomainDto.priority,
              complexity: updateDomainDto.complexity,
              changeNote: updateDomainDto.changeNote,
            },
          ],
        },
      },
      where: { id: id },
    });

    return this.findOne(id);
  }
}
