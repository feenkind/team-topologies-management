import { Injectable } from '@nestjs/common';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { PrismaService } from '../prisma.service';
import { Domain } from '@prisma/client';

@Injectable()
export class DomainsService {
  constructor(private prisma: PrismaService) {}

  create(createDomainDto: CreateDomainDto) {
    return 'This action adds a new domain';
  }

  async findAll(includeHistory: boolean): Promise<Domain[]> {
    if (includeHistory) {
      return this.prisma.domain.findMany({ include: { DomainHistory: true } });
    }

    return this.prisma.domain.findMany();
  }

  async findOne(id: string): Promise<Domain> {
    return this.prisma.domain.findUnique({ where: { id } });
  }

  update(id: number, updateDomainDto: UpdateDomainDto) {
    return `This action updates a #${id} domain`;
  }

  remove(id: number) {
    return `This action removes a #${id} domain`;
  }
}
