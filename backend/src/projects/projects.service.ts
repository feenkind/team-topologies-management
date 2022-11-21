import { Injectable } from '@nestjs/common';
import { Project, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  create(createInput: Prisma.ProjectCreateInput) {
    return this.prisma.project.create({ data: createInput });
  }

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async findOne(id: string): Promise<Project> {
    return this.prisma.project.findUnique({ where: { id } });
  }

  async update({
    data,
    where,
  }: {
    data: Prisma.ProjectUpdateInput;
    where: Prisma.ProjectWhereUniqueInput;
  }): Promise<Project> {
    return this.prisma.project.update({ data, where });
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}
