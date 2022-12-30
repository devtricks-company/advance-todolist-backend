import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { UserParams, IUserService, UserType } from './types/Usre.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword } from 'src/helper/passwordHelper';
import { IProjectService } from 'src/project/types/project.types';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject('ProjectService') private readonly projectService: IProjectService,
  ) {}

  async getUsersListForParticipant(
    projectId: string,
  ): Promise<UserDocument[] | undefined> {
    const project = await this.projectService.getProjectById(projectId);
    // return this.getAllUser().filter((user) => {
    //   return !project.participant.includes(user._id);
    // });

    const users = (await this.getAllUser()).filter((user: UserDocument) => {
      return !project.participant.find(
        (parti) => parti._id.toString() === user._id.toString(),
      );
    });

    return users;
  }

  async createUser(params: UserParams): Promise<User> {
    const user = await this.getAUserByEmail(params.email);
    if (user) {
      throw new HttpException('email is already exist', HttpStatus.BAD_REQUEST);
    }

    const hashUserPassword = await hashPassword(params.password);
    return await this.userModel.create({
      ...params,
      password: hashUserPassword,
    });
  }
  getAllUser(): Promise<UserDocument[]> {
    return this.userModel.find({}).exec();
  }
  getAUser(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
  async getAUserByEmail(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email }).exec();
  }
  updateUser(id: string, params: UserParams): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, params).exec();
  }
  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userModel.findByIdAndRemove(id).exec();
    if (result) return true;
    return false;
  }
}
