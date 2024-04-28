import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '.prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.user({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.roleId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}


