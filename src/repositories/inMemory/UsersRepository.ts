import { IInMemoryRepository, IUsersRepository } from "@/repositories";
import { Prisma, User } from "@prisma/client";

export class UsersRepository
  implements IUsersRepository, IInMemoryRepository<User>
{
  public items: Array<User> = [];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.items.find(item => item.email === email);
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
