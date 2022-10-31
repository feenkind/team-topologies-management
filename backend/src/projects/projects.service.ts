import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { projects } from '../dummyData';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
  }

  findAll(): Project[] {
    return projects;
  }

  findOne(id: string) {
    return projects.find((project) => id === project.id);
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}
