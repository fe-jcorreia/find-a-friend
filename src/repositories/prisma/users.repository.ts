import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../users-repository.interface";
import { prisma } from "@src/data/prisma";

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }
}
