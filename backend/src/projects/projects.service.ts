import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectDto } from './dto/project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectDto> {
    const project = await this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        description: createProjectDto.description,
      },
    });

    return {
      id: project.id,
      name: project.name,
      description: project.description,
    };
  }

  async findAll(): Promise<ProjectDto[]> {
    const projects = await this.prisma.project.findMany();
    return projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
    }));
  }

  async findOne(id: string): Promise<ProjectDto> {
    const project = await this.prisma.project.findUnique({ where: { id } });
    return project
      ? {
          id: project.id,
          name: project.name,
          description: project.description,
        }
      : null;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDto> {
    const project = await this.prisma.project.update({
      where: { id: id },
      data: {
        name: updateProjectDto.name,
        description: updateProjectDto.description,
      },
    });

    return {
      id: project.id,
      name: project.name,
      description: project.description,
    };
  }
}
