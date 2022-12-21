import { User } from '../entities/user.entity';

export interface IUserService {
  createUser(params: UserParams): Promise<User | undefined>;
  getAllUser(): Promise<User[]>;
  getAUser(id: string): Promise<User | undefined>;
  getAUserByEmail(email: string): Promise<User | undefined>;
  updateUser(id: string, params: UserParams): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;
}

export type UserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};
