import { type IUsersRepository } from "@/repositories";
import bcrypt from "bcryptjs";
import { UserAlreadyExistsError } from "@/useCases/errors";

interface Register {
  email: string;
  name: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async run({ email, name, password }: Register): Promise<Register> {
    const hashedPassword = await bcrypt.hash(password, 6);

    if (await this.usersRepository.findByEmail(email)) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create({
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
