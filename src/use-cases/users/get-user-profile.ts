import { UsersRepositoryInterface } from "@/repositories";
import { User } from "@/types";
import { UseCaseInterface } from "@/use-cases";
import { ResourceNotFoundError } from "@/use-cases/errors";

interface IGetUserProfile {
  id: string;
}

export class GetUserProfile
  implements UseCaseInterface<UsersRepositoryInterface, IGetUserProfile, User>
{
  constructor(public repository: UsersRepositoryInterface) {}

  async run({ id }: IGetUserProfile): Promise<User> {
    const user = await this.repository.findById(id);

    if (user === null) throw new ResourceNotFoundError();

    return user;
  }
}
