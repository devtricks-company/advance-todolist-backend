import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { IUserService, UserType } from '../../user/types/Usre.type';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('UserService') private readonly userService: IUserService,
  ) {
    super();
  }

  serializeUser(user: UserType, done: Function) {
    done(null, user);
  }

  async deserializeUser(user: UserType, done: Function) {
    const userDb = await this.userService.getAUser(user._id);
    return userDb ? done(null, userDb) : done(null, null);
  }
}
