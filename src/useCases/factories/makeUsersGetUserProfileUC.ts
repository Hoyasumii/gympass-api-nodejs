import { UsersRepository } from "@/repositories/prisma";
import { users } from "@/useCases";

export function makeUsersGetUserProfileUC() {
  const usersRepository = new UsersRepository();
  const getUserProfile = new users.GetUserProfile(usersRepository);

  return getUserProfile;
}
