import { Project } from 'src/project/entities/project.entitiy';
import { User } from 'src/user/entities/user.entity';
import { TaskDocument } from '../entity/task.entity';

export enum Priority {
  Low,
  Mid,
  High,
  Critical,
}

export enum TaskType {
  type,
  Product,
}

export enum TaskState {
  New,
  WorkingOn,
  Done,
}

export interface ITaskService {
  addTask(params: addTaskParams): Promise<TaskDocument | undefined>;
}

export type addTaskParams = {
  title: string;
  description?: string;
  priority?: Priority;
  project: Project;
  state: TaskState;
  type: TaskType;
  assignTo?: User;
};
