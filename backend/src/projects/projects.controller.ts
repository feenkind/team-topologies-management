import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { ProjectDto } from './dto/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(AuthGuard('basic'))
  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<ProjectDto> {
    return this.projectsService.create(createProjectDto);
  }

  @UseGuards(AuthGuard('basic'))
  @Get()
  findAll(): Promise<ProjectDto[]> {
    return this.projectsService.findAll();
  }

  @UseGuards(AuthGuard('basic'))
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProjectDto> {
    return this.projectsService.findOne(id);
  }

  @UseGuards(AuthGuard('basic'))
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDto> {
    return this.projectsService.update(id, updateProjectDto);
  }
}
