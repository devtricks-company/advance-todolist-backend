import { Inject, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { comparePassword } from 'src/helper/passwordHelper';
import { User } from 'src/user/entities/user.entity';
import { IUserService } from 'src/user/types/Usre.type';
import { IAuth } from './type/auth.interface';

@Injectable()
export class AuthService implements IAuth {
  constructor(
    @Inject('UserService') private readonly userService: IUserService,
  ) {}
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getAUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const match = await comparePassword(user.password, password);
    if (!match) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
