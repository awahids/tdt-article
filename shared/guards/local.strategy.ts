import { AuthService } from '@/modules/users/auth/auth.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { errorResponse } from '@shared/utils/response';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.authService.validateUser(email, password);

      if (!user) {
        return errorResponse('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      return user;
    } catch (error) {
      return errorResponse(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
