import { IUsersRepository } from "@/repositories";
import { User } from "@/types";
import { UseCaseInterface } from "@/useCases";
import { ResourceNotFoundError } from "@/useCases/errors";

interface IGetUserProfile {
  id: string;
}

export class GetUserProfile
  implements UseCaseInterface<IUsersRepository, IGetUserProfile, User>
{
  constructor(public repository: IUsersRepository) {}

  async run({ id }: IGetUserProfile): Promise<User> {
    const user = await this.repository.findById(id);

    if (user === null) throw new ResourceNotFoundError();

    return user;
  }
}
