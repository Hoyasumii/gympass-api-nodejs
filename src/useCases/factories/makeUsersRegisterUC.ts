import { UsersRepository } from "@/repositories/prisma";
import { users } from "@/useCases";

export function makeUsersRegisterUC() {
  const usersRepository = new UsersRepository();
  const registerUseCase = new users.Register(usersRepository);

  return registerUseCase;
}
