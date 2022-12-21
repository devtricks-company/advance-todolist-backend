import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { IAuth } from '../type/auth.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AuthService') private readonly authService: IAuth) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      if (!email) {
        throw new HttpException('email is required', HttpStatus.BAD_REQUEST);
      }

      if (!password) {
        throw new HttpException('password is required', HttpStatus.BAD_REQUEST);
      }
      // throw new UnauthorizedException();
    }

    return user;
  }
}
