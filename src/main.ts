import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT } = process.env;
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  try {
    await app.listen(PORT, () =>
      console.log(`the server is running the port ${PORT}`),
    );
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
