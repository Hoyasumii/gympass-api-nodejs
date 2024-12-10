import { describe, it, expect } from "vitest";
import { RegisterUseCase } from "./RegisterUseCase";
import { UsersRepository } from "@/repositories/inMemory";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "@/useCases/errors";

describe("Register Use Case", () => {
  it("should to register", async () => {
    const usersRepository = new UsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { email } = await registerUseCase.run({
      name: "John Doe",
      email: "account@email.com",
      password: "123456",
    });

    expect(email).toBeDefined();
  });

  it("should hash user password upon registration", async () => {
    const usersRepository = new UsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { password } = await registerUseCase.run({
      name: "John Doe",
      email: "account@email.com",
      password: "123456",
    });

    const comparePassword = await compare("123456", password);

    expect(comparePassword).toBeTruthy();
  });

  it("should not be able to register with same email twice", async () => {
    const usersRepository = new UsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.run({
      name: "John Doe",
      email: "account@email.com",
      password: "123456",
    });

    expect(async () => {
      await registerUseCase.run({
        name: "John Doe",
        email: "account@email.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
