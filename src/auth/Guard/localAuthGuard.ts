import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.body.email) {
      throw new HttpException('email is required', HttpStatus.BAD_REQUEST);
    }
    if (!request.body.password) {
      throw new HttpException('password is required', HttpStatus.BAD_REQUEST);
    }
    const result = (await super.canActivate(context)) as boolean;

    await super.logIn(request);

    return result;
  }
}
