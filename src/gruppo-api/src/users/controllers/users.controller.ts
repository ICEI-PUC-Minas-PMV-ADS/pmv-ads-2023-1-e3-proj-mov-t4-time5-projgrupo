import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    await this.usersService.create(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  findOne(
    @Param(
      'email'
    )
    email: string,
  ) {
    return this.usersService.findByEmail(email).then((user) => { 
      if (!user) return new HttpException('User not found', HttpStatus.NOT_FOUND);
      return user; 
    });
  } 

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() body: UpdateUserDto,
    @Res() response: Response,
  ) {
    return (
      response
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .status(HttpStatus.CREATED)
        .send(this.usersService.update(id, body))
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ) {
    return this.usersService.remove(id);
  }
}
