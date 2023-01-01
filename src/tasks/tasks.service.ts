import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { Task, TaskDocument } from './entity/task.entity';
import { addTaskParams, ITaskService } from './types/task.types';

@Injectable()
export class TasksService implements ITaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}
  addTask(
    params: addTaskParams,
  ): Promise<Document<unknown, any, Task> & Task & { _id: Types.ObjectId }> {
    return this.taskModel.create(params);
  }
}
