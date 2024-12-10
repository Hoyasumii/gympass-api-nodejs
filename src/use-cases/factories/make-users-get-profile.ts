import { UsersRepository } from "@/repositories/prisma";
import { users } from "@/use-cases";

export function makeUsersGetUserProfileUC() {
  const usersRepository = new UsersRepository();
  const getUserProfile = new users.GetUserProfile(usersRepository);

  return getUserProfile;
}
