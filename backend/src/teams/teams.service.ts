import { Injectable } from '@nestjs/common';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from '../prisma.service';
import { Prisma, Team } from '@prisma/client';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  create(createInput: Prisma.TeamCreateInput): Promise<Team> {
    return this.prisma.team.create({ data: createInput });
  }

  findAll(includeHistory: boolean): Promise<Team[]> {
    if (includeHistory) {
      return this.prisma.team.findMany({
        include: {
          TeamHistory: true,
          CommunicationChannel: true,
          Meeting: true,
          Service: true,
          WayOfWorking: true,
          Work: true,
          DomainsOnTeams: true,
          DomainsOnTeamsHistory: true,
        },
      });
    }
    return this.prisma.team.findMany();
  }

  findOne(id: string): Promise<Team> {
    return this.prisma.team.findUnique({ where: { id } });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
