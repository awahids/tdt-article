
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserInterface } from './interface/create-user.interface';
import { errorHandler, successResponse } from '@shared/utils/response';
import { LocalAuthGuard } from '@shared/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Users')
@Controller('v1')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  @Post('user/signup')
  @ApiBody({ type: CreateUserDto })
  async signupUser(@Body() userData: CreateUserDto): Promise<CreateUserInterface> {
    try {
      const user = await this.userService.createUser(userData);

      return successResponse({ data: user });
    } catch (error) {
      return errorHandler(error);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('user/login')
  @ApiBody({ type: LoginUserDto })
  async login(@Request() req: any) {
    try {
      const user = await this.authService.login(req.user);

      return successResponse({ data: user });
    } catch (error) {
      console.log(error)
      return errorHandler(error);
    }
  }
}
