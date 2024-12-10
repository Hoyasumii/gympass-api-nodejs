import { type IUsersRepository } from "@/repositories";
import bcrypt from "bcryptjs";
import { UserAlreadyExistsError } from "@/use-cases/errors";
import { UseCaseInterface } from "@/use-cases";

interface IRegister {
  email: string;
  name: string;
  password: string;
}

export class Register
  implements UseCaseInterface<IUsersRepository, IRegister, IRegister>
{
  constructor(public repository: IUsersRepository) {}

  public async run({ email, name, password }: IRegister): Promise<IRegister> {
    const hashedPassword = await bcrypt.hash(password, 6);

    if (await this.repository.findByEmail(email)) {
      throw new UserAlreadyExistsError();
    }

    await this.repository.create({
      email,
      name,
      password: hashedPassword,
    });

    return {
      email,
      name,
      password: hashedPassword,
    };
  }
}
