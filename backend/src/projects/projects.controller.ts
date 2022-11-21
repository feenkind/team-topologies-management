import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(AuthGuard('basic'))
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create({
      name: createProjectDto.name,
      description: createProjectDto.description,
    });
  }

  @UseGuards(AuthGuard('basic'))
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @UseGuards(AuthGuard('basic'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @UseGuards(AuthGuard('basic'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update({
      where: { id: id },
      data: {
        name: updateProjectDto.name,
        description: updateProjectDto.description,
      },
    });
  }

  @UseGuards(AuthGuard('basic'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
