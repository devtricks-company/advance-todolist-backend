import { IsNotEmpty } from 'class-validator';
import { Project } from 'src/project/entities/project.entitiy';
import { User } from 'src/user/entities/user.entity';
import { Priority, TaskState, TaskType } from '../types/task.types';

export class AddTaskDto {
  @IsNotEmpty()
  title: string;

  description?: string;
  priority?: Priority;

  @IsNotEmpty()
  project: Project;

  @IsNotEmpty()
  state: TaskState;
  @IsNotEmpty()
  type: TaskType;

  assignTo?: User;
}
