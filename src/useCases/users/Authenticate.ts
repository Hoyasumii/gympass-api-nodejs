import { IUsersRepository } from "@/repositories";
import { IUseCase } from "@/useCases";
import { InvalidCredentialsError } from "./errors";
import bcrypt from "bcryptjs";

type Authentication = {
  email: string;
  password: string;
};

export class Authenticate
  implements IUseCase<IUsersRepository, Authentication, true>
{
  constructor(public repository: IUsersRepository) {}

  async run({ email, password }: Authentication): Promise<true> {
    const user = await this.repository.findByEmail(email);

    if (!user) throw new InvalidCredentialsError();

    const doesPasswordMatches = await bcrypt.compare(password, user.password);
    
    if (!doesPasswordMatches) throw new InvalidCredentialsError();

    return true;
  }
}
