import { Body, Controller, Inject, Post, Put, UseGuards } from '@nestjs/common';
import { Get, Param } from '@nestjs/common/decorators';
import { AuthUser } from 'src/auth/decorator/auth.decorator';
import { AuthenticatedGuard } from 'src/auth/Guard/AuthenticatedGuard';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserType } from 'src/user/types/Usre.type';
import { AddParticipantsDTO } from './dtos/addParticipants.DTO';
import { AddProjectDto } from './dtos/Addproject.Dto';
import { UpdateProjectDto } from './dtos/updateProject.Dto';
import { IProjectService } from './types/project.types';

@Controller('project')
export class ProjectController {
  constructor(
    @Inject('ProjectService') private readonly projectService: IProjectService,
  ) {}

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  getAProject(@Param('id') id: string) {
    return this.projectService.getProjectById(id);
  }

  @Post()
  @UseGuards(AuthenticatedGuard)
  async addProject(
    @Body() projectInfo: AddProjectDto,
    @AuthUser() owner: UserType,
  ) {
    return await this.projectService.addProject({
      ...projectInfo,
      owner,
      participant: [owner],
    });
  }

  @Put(':id')
  @UseGuards(AuthenticatedGuard)
  async updateProject(
    @AuthUser() owner: UserType,
    @Param('id') projectId: string,
    @Body() updateDetails: UpdateProjectDto,
  ) {
    return await this.projectService.updateProject(
      owner,
      projectId,
      updateDetails,
    );
  }

  @Put('addparticipants/:id')
  @UseGuards(AuthenticatedGuard)
  async addPrticipants(
    @Body() participants: AddParticipantsDTO,
    @Param('id') id: string,
    @AuthUser() owner: UserType,
  ) {
    return this.projectService.addParticipants(
      id,
      participants.participatns,
      owner,
    );
  }

  @Get('')
  @UseGuards(AuthenticatedGuard)
  async getProjectForUser(@AuthUser() user: UserType) {
    return this.projectService.getProjectByUser(user);
  }
}
