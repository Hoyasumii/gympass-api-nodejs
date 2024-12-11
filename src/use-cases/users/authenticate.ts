import { UsersRepositoryInterface } from "@/repositories";
import { UseCaseInterface } from "@/use-cases";
import { InvalidCredentialsError } from "@/use-cases/errors";
import bcrypt from "bcryptjs";

type Authentication = {
  email: string;
  password: string;
};

export class Authenticate
  implements UseCaseInterface<UsersRepositoryInterface, Authentication, true>
{
  constructor(public repository: UsersRepositoryInterface) {}

  async run({ email, password }: Authentication): Promise<true> {
    const user = await this.repository.findByEmail(email);

    if (!user) throw new InvalidCredentialsError();

    const doesPasswordMatches = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatches) throw new InvalidCredentialsError();

    return true;
  }
}
