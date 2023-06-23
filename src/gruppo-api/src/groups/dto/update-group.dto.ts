import { CreateUserDto } from './create-group.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGroupDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    picture?: string;

    @ApiProperty()
    password?: string;

    @ApiProperty()
    internalId?: string;

    @ApiProperty()
    role?: string;
}
