import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Domain, Prisma } from '@prisma/client';

@Injectable()
export class DomainsService {
  constructor(private prisma: PrismaService) {}

  create(createInput: Prisma.DomainCreateInput): Promise<Domain> {
    return this.prisma.domain.create({ data: createInput });
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

  update({
    data,
    where,
  }: {
    data: Prisma.DomainUpdateInput;
    where: Prisma.DomainWhereUniqueInput;
  }): Promise<Domain> {
    return this.prisma.domain.update({ data, where });
  }

  remove(id: number) {
    return `This action removes a #${id} domain`;
  }
}
