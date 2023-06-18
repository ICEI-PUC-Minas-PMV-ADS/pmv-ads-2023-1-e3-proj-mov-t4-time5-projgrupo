import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

const hashPassword: ValueTransformer = {
  from: (value: string) => value,
  to: (value: string) => {
    const SALT_ROUNDS = 10;
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    return bcrypt.hashSync(value, salt);
  },
};

const transformToLowerCase: ValueTransformer = {
  from: (value: string) => value,
  to: (value: string) => value && value.toLowerCase(),
};

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({
    nullable: true,
    default: null,
    name: 'internal_id'
  })
  internalId: string;

  @Column({
    nullable: true,
    default: null,
    name: 'role'
  })
  role: string;

  @Column({
    unique: true,
    transformer: transformToLowerCase,
  })
  email: string;

  @Column({
    unique: true,
    nullable: true,
    default: null,
    transformer: transformToLowerCase,
  })
  github: string;

  @Column({
    nullable: true,
    default: null,
  })
  picture: string;

  @Column({ transformer: hashPassword, select: false })
  password: string;

  @Column({
    name: 'access_token',
    nullable: true,
    default: null,
  })
  accessToken: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
