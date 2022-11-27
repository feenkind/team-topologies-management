import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DomainsService } from './domains.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { AuthGuard } from '@nestjs/passport';
import { DomainDto } from './dto/domain.dto';

@Controller('domains')
export class DomainsController {
  constructor(private readonly domainService: DomainsService) {}

  @UseGuards(AuthGuard('basic'))
  @Post()
  create(@Body() createDomainDto: CreateDomainDto): Promise<DomainDto> {
    return this.domainService.create(createDomainDto);
  }

  @UseGuards(AuthGuard('basic'))
  @Get()
  findAll(): Promise<DomainDto[]> {
    return this.domainService.findAll();
  }

  @UseGuards(AuthGuard('basic'))
  @Get(':id')
  findOne(@Param('id') id: string): Promise<DomainDto> {
    return this.domainService.findOne(id);
  }

  @UseGuards(AuthGuard('basic'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDomainDto: UpdateDomainDto) {
    return this.domainService.update(id, updateDomainDto);
  }
}
