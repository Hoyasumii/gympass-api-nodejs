import { Prisma, User } from "@prisma/client";

export interface IUsersRepository {
  findByEmail(email: string): Promise<boolean>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}