import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenitcatedRequest } from '../type/auth.interface';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = <AuthenitcatedRequest>ctx.switchToHttp().getRequest();
    return request.user;
  },
);
