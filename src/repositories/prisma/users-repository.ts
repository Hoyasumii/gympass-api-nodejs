import { UsersRepositoryInterface } from "@/repositories";
import { User } from "@/types";
import { prisma } from "@/utils";

export class UsersRepository implements UsersRepositoryInterface {
  async findByEmail(email: string): Promise<User | undefined> {
    const userExists = await prisma.user.findUnique({ where: { email } });

    return userExists || undefined;
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async create(data: Omit<User, "id" | "created_at">): Promise<User> {
    const user = await prisma.user.create({ data });

    return user;
  }
}
