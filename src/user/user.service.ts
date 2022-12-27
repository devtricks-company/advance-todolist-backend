import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { UserParams, IUserService } from './types/Usre.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword } from 'src/helper/passwordHelper';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

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
  getAllUser(): Promise<User[]> {
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
