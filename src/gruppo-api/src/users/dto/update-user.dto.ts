import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    picture?: string;

    @ApiProperty()
    password?: string;

    @ApiProperty()
    internalId?: string;

    @ApiProperty()
    role?: string;
}
