import { InMemoryRepositoryInterface, UsersRepositoryInterface } from "@/repositories";
import { User } from "@/types";
import { randomUUID } from "node:crypto";

export class UsersRepository
  implements UsersRepositoryInterface, InMemoryRepositoryInterface<User>
{
  public items: Array<User> = [];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.items.find((item) => item.email === email);
  }

  async findById(id: string): Promise<User | null> {
    return this.items.find((item) => item.id === id) || null;
  }

  async create(data: Omit<User, "id" | "created_at">): Promise<User> {
    const { email, name, password } = data;

    const userContent: User = {
      email,
      name,
      password,
      id: randomUUID(),
      created_at: new Date(),
    };

    this.items.push(userContent);

    return userContent;
  }
}
