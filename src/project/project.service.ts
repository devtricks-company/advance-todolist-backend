import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserType } from 'src/user/types/Usre.type';
import { Project, ProjectDocument } from './entities/project.entitiy';
import {
  AddProjectParams,
  IProjectService,
  UpdateProjectParams,
} from './types/project.types';

@Injectable()
export class ProjectService implements IProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly ProjectModel: Model<ProjectDocument>,
  ) {}
  async getProjectByUser(user: UserType): Promise<Project[]> {
    console.log(user);
    const projects = await this.ProjectModel.aggregate([
      {
        $match: {
          participant: { $in: [new mongoose.Types.ObjectId(user._id)] },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'participant',
          foreignField: '_id',
          as: 'participant',
        },
      },
    ]).exec();

    return projects;
  }
  async addParticipants(
    id: string,
    participant: UserType[],
    owner: UserType,
  ): Promise<Project> {
    const project = await this.getProjectById(id);
    if (!project || project.owner._id.toString() !== owner._id.toString()) {
      throw new HttpException(
        'You Are not Owner this Project',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const participants = [...project.participant, ...participant];
    await this.ProjectModel.findByIdAndUpdate(
      id,
      { ...project, participant: participants },
      {
        new: true,
        runValidators: true,
      },
    ).exec();

    return await this.getProjectById(id);
  }
  async getProjectById(id: string): Promise<Project> {
    const result = await this.ProjectModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'owner',
        },
      },
      {
        $unwind: {
          path: '$owner',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'participant',
          foreignField: '_id',
          as: 'participant',
        },
      },
    ]).exec();

    console.log(result);
    return result[0];
  }
  async updateProject(
    owner: UserType,
    id: string,
    updateProjectParams: UpdateProjectParams,
  ): Promise<Project> {
    const project = await this.getProjectById(id);

    if (!project || project.owner._id.toString() !== owner._id.toString()) {
      throw new HttpException(
        'You Are not Owner this Project',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const reslut = await this.ProjectModel.findByIdAndUpdate(
      id,
      updateProjectParams,
      {
        new: true,
        runValidators: true,
      },
    ).exec();

    return reslut;
  }
  async addProject(addprojectParams: AddProjectParams): Promise<Project> {
    return await this.ProjectModel.create(addprojectParams);
  }
}
