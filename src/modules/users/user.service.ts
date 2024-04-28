import { PrismaService } from '@core/database/prisma.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { CreateUserInterface, createUserInterface } from './interface/create-user.interface';
import * as bcrypt from 'bcrypt';
import { errorResponse } from '@shared/utils/response';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        role: true
      }
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(userDto: CreateUserDto): Promise<CreateUserInterface> {
    const { roleId, password } = userDto

    const role = await this.prisma.role.findFirst({
      where: {
        uuid: roleId
      }
    })

    if (!role) {
      return errorResponse('Role not found', HttpStatus.BAD_REQUEST)
    }

    const user = await this.prisma.user.create({
      data: {
        ...userDto,
        password: await bcrypt.hash(password, 10),
        roleId: role.id
      }
    })

    return createUserInterface(user, role)
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}