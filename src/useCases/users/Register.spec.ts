import { describe, it, expect, beforeEach } from "vitest";
import { Register } from "./Register";
import { UsersRepository } from "@/repositories/inMemory";
import { UserAlreadyExistsError } from "./errors";
import { isBcryptHash } from "@/utils";

let usersRepository: UsersRepository;
let registerUseCase: Register;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    registerUseCase = new Register(usersRepository);
  });

  it("should to register", async () => {
    const { email } = await registerUseCase.run({
      name: "John Doe",
      email: "account@email.com",
      password: "123456",
    });

    expect(email).toBeDefined();
  });

  it("should hash user password upon registration", async () => {
    const { password } = await registerUseCase.run({
      name: "John Doe",
      email: "account@email.com",
      password: "123456",
    });

    const comparePassword = isBcryptHash(password);

    expect(comparePassword).toBeTruthy();
  });

  it("should not be able to register with same email twice", async () => {
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
