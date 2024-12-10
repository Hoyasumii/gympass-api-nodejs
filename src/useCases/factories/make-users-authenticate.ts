import { UsersRepository } from "@/repositories/prisma";
import { users } from "@/useCases";

export function makeUsersAuthenticateUC() {
  const usersRepository = new UsersRepository();
  const authenticate = new users.Authenticate(usersRepository);

  return authenticate;
}
