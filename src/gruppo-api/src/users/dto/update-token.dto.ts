import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTokenDto extends PartialType(CreateUserDto) {
  accessToken?: string;
}
