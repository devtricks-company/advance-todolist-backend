import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { ProjectModule } from 'src/project/project.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ProjectModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserService',
      useClass: UserService,
    },
  ],

  exports: [
    {
      provide: 'UserService',
      useClass: UserService,
    },
  ],
})
export class UserModule {}
