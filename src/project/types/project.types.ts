import { User } from 'src/user/entities/user.entity';
import { UserType } from 'src/user/types/Usre.type';
import { Project } from '../entities/project.entitiy';

export interface IProjectService {
  addProject(addprojectParams: AddProjectParams): Promise<Project>;
  updateProject(
    owner: UserType,
    id: string,
    updateProjectParams: UpdateProjectParams,
  ): Promise<Project>;
  getProjectById(id: string): Promise<Project>;
  addParticipants(
    id: string,
    participant: UserType,
    owner: UserType,
  ): Promise<Project>;
  getProjectByUser(user: UserType): Promise<Project[]>;
}

export type AddProjectParams = {
  title: string;
  description: string;
  owner: UserType;

  participant: UserType[];
};

export type UpdateProjectParams = {
  title?: string;
  description?: string;
};
