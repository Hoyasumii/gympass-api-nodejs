import { User } from "@/types";

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | null>;
  create(data: Omit<User, "id" | "created_at">): Promise<User>;
}
