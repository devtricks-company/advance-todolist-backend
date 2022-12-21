import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    SessionSerializer,
    {
      provide: 'AuthService',
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
