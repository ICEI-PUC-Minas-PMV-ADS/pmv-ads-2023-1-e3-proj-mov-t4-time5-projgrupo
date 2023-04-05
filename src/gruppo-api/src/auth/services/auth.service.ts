import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!bcrypt.compareSync(password, user.password))
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    return user;
  }

  async login(user): Promise<any> {
    const payload = { sub: { id: user.id } };
    const jwt = {
      id: user.id,
      access_token: this.jwtService.sign(payload, {
        secret: new ConfigService().get('JWT_SECRET'),
        expiresIn: '7days',
      }),
    };
    await this.usersService.update(jwt.id, { accessToken: jwt.access_token });
    return jwt;
  }
}
