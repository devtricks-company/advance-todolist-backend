import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class AddProjectDto {
  @IsNotEmpty()
  title: string;
  description: string;
}
