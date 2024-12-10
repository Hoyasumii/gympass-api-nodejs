import { describe, it, expect } from "vitest";
import { UsersRepository } from "@/repositories/inMemory";
import { InvalidCredentialsError } from "./errors";
import { Authenticate } from "./Authenticate";
import bcrypt from 'bcryptjs';

describe("Authenticate Use Case", () => {
  it("should to authenticate a user", async () => {
    const repository = new UsersRepository();
    const authenticateUseCase = new Authenticate(repository);

    await repository.create({
      name: "John Doe",
      email: "account@email.com",
      password: bcrypt.hashSync("123456", 1),
    });

    await expect(
      authenticateUseCase.run({
        email: "account@email.com",
        password: "123456",
      })
    ).resolves.toBeTruthy();
  });

  it("should reject invalid authentication", async () => {
    const repository = new UsersRepository();
    const authenticateUseCase = new Authenticate(repository);

    await repository.create({
      name: "John Doe",
      email: "account@email.com",
      password: "123456",
    });

    await expect(
      authenticateUseCase.run({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
