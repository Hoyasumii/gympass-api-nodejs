import { type IUsersRepository } from "@/repositories";
import bcrypt from "bcryptjs";

interface Register {
  email: string;
  name: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async run({ email, name, password }: Register) {
    const hashedPassword = await bcrypt.hash(password, 6);

    if (await this.usersRepository.findByEmail(email)) {
      throw new Error("E-mail already exists.");
    }

    await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });
  }
}
