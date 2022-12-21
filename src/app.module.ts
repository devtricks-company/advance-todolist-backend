import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as MongodbStoreConnect from 'connect-mongodb-session';

const MongodbStore = MongodbStoreConnect(session);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
    MongooseModule.forRoot(`mongodb://localhost:27017/todolist-advance`),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('midde running');
    consumer
      .apply(
        session({
          secret: 'sdfsdfsdfsdjfksdjf',
          saveUninitialized: false,
          resave: true,
          cookie: {
            maxAge: 3600000 * 24 * 10,
            httpOnly: true,
          },
          store: new MongodbStore({
            uri: 'mongodb://localhost:27017/todolist-advance',
            collection: 'mySessions',
          }),
        }),

        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
