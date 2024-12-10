import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "@/repositories";
import { prisma } from "@/utils";

export class UsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | undefined> {
    const accountExists = await prisma.user.findUnique({ where: { email } });

    return accountExists || undefined;
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });

    return user;
  }
}
