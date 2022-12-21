import { IsNotEmpty, IsEmail, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(26)
  firstName: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(26)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(26)
  password: string;
}
