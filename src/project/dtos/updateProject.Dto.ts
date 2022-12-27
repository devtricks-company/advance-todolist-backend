import { IsNotEmpty, isNotEmpty } from 'class-validator';

export class UpdateProjectDto {
  title?: string;

  description?: string;
}
