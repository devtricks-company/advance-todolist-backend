import { IsNotEmpty } from 'class-validator';
import { UserType } from 'src/user/types/Usre.type';

export class AddParticipantsDTO {
  @IsNotEmpty()
  participatns: UserType;
}
