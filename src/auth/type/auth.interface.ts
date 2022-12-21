import { User } from 'src/user/entities/user.entity';

export interface IAuth {
  validateUser(email: string, password: string): Promise<User>;
}
