import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(document: CreateUserDto): Promise<void> {
    const alreadyHasUser = await this.findByEmail(document.email);
    if (alreadyHasUser)
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    const user = this.userRepository.create(document);
    await this.userRepository.save(user);
  }

  findAll(): Promise<Array<UserEntity>> {
    return this.userRepository.find({ withDeleted: false });
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      withDeleted: false,
      select: ['email', 'firstName', 'lastName', 'accessToken'],
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async findByEmail(email: string): Promise<any> {
    return this.userRepository.findOne({
      where: { email },
      withDeleted: false,
      select: ['email', 'password', 'accessToken', 'id', 'firstName'],
    });
  }

  async update(id: string, document: UpdateUserDto): Promise<void> {
    await this.userRepository.update({ id }, document);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
