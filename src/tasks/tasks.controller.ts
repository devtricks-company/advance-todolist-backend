import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AddTaskDto } from './Dto/add.task.dto';
import { ITaskService } from './types/task.types';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject('TaskService') private readonly taskService: ITaskService,
  ) {}
  @Post()
  addTask(@Body() addTasksParams: AddTaskDto) {
    return this.taskService.addTask(addTasksParams);
  }
}
