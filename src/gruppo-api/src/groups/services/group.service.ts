import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-group.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/group.entity';
import { UpdateGroupDto } from '../dto/update-group.dto';

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

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      withDeleted: false,
      select: ['id', 'email', 'firstName', 'lastName', 'picture', 'github', 'internalId'],
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async findByEmail(email: string): Promise<any> {
    return this.userRepository.findOne({
      where: { email },
      withDeleted: false,
      select: ['email', 'password', 'accessToken', 'id', 'firstName', 'picture', 'github', 'internalId', 'role'],
    });
  }

  async update(id: string, document: UpdateGroupDto): Promise<void> {
    await this.userRepository.update({ id }, document);
  }  

  async remove(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
