import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { get } from 'http';
import { IUserService } from 'src/user/types/Usre.type';
import { RegisterDto } from './dtos/register.dto';
import { AuthenticatedGuard } from './Guard/AuthenticatedGuard';
import { LocalAuthGuard } from './Guard/localAuthGuard';
import { IAuth } from './type/auth.interface';
import { Request, Response } from 'express';
import { LoginDto } from './dtos/login.dto';
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthService') private readonly authService: IAuth,
    @Inject('UserService') private readonly userService: IUserService,
  ) {}
  @Post('/register')
  register(@Body() registerInfo: RegisterDto) {
    return this.userService.createUser(registerInfo);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Body() loginDto: LoginDto) {
    return loginDto;
  }

  @Get('/status')
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request, @Res() res: Response) {
    res.status(HttpStatus.OK).send(req.user);
  }
}
