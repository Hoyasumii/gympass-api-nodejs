import { describe, it, expect } from "vitest";
import { Register } from "./Register";
import { UsersRepository } from "@/repositories/inMemory";
import { UserAlreadyExistsError } from "./errors";
import { isBcryptHash } from "@/utils";

describe("Register Use Case", () => {
  it("should to register", async () => {
    const usersRepository = new UsersRepository();
    const registerUseCase = new Register(usersRepository);

    const { email } = await registerUseCase.run({
      name: "John Doe",
      email: "account@email.com",
      password: "123456",
    });

    expect(email).toBeDefined();
  });

  it("should hash user password upon registration", async () => {
    const usersRepository = new UsersRepository();
    const registerUseCase = new Register(usersRepository);

    const { password } = await registerUseCase.run({
      name: "John Doe",
      email: "account@email.com",
      password: "123456",
    });

    const comparePassword = isBcryptHash(password);

    expect(comparePassword).toBeTruthy();
  });

  it("should not be able to register with same email twice", async () => {
    const usersRepository = new UsersRepository();
    const registerUseCase = new Register(usersRepository);

    await registerUseCase.run({
      name: "John Doe",
      email: "account@email.com",
      password: "123456",
    });

    await expect(
      registerUseCase.run({
        name: "John Doe",
        email: "account@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
