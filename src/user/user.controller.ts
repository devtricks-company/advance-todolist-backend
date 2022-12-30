import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService, UserType } from './types/Usre.type';
import { User, UserDocument } from './entities/user.entity';
import { AuthenticatedGuard } from 'src/auth/Guard/AuthenticatedGuard';

@Controller('user')
export class UserController {
  constructor(
    @Inject('UserService') private readonly userService: IUserService,
  ) {}

  @Get()
  getAllUser(): Promise<UserDocument[]> {
    return this.userService.getAllUser();
  }

  @Get(':id')
  getAUser(@Param('id') id: string): Promise<User | undefined> {
    return this.userService.getAUser(id);
  }

  @Get('/project/:id')
  @UseGuards(AuthenticatedGuard)
  async getUsersForProjectParticipants(
    @Param('id') projectId: string,
  ): Promise<UserDocument[] | undefined> {
    return this.userService.getUsersListForParticipant(projectId);
  }

  @Post()
  createUser(@Body() userParams: CreateUserDto): Promise<User | undefined> {
    return this.createUser(userParams);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() userParams: UpdateUserDto,
  ): Promise<User | undefined> {
    return this.updateUser(id, userParams);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.deleteUser(id);
  }
}
