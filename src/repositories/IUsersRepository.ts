import { Prisma, User } from "@prisma/client";

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}