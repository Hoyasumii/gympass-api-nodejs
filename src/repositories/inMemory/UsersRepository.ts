import { IInMemoryRepository, IUsersRepository } from "@/repositories";
import { Prisma, User } from "@prisma/client";

export class UsersRepository
  implements IUsersRepository, IInMemoryRepository<User>
{
  public items: Array<User> = [];

  async findByEmail(email: string): Promise<boolean> {
    return this.items.findIndex(item => item.email === email) !== -1;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const { email, name, password, created_at, id } = data;

    const userContent: User = {
      email,
      name,
      password,
      id: id || "id",
      created_at: created_at as Date,
    };

    this.items.push(userContent);

    return userContent;
  }
}
