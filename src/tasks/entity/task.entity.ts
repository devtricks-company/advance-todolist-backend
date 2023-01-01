import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Project } from 'src/project/entities/project.entitiy';
import { User, UserDocument } from 'src/user/entities/user.entity';
import { Priority, TaskState, TaskType } from '../types/task.types';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  priority: Priority;

  @Prop({ required: true })
  type: TaskType;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  assignTo: User;

  @Prop({ required: true })
  state: TaskState;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Project' })
  project: Project;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
