import { describe, it, expect, beforeEach } from "vitest";
import { UsersRepository } from "@/repositories/inMemory";
import { InvalidCredentialsError } from "@/useCases/errors";
import { Authenticate } from "./Authenticate";
import bcrypt from "bcryptjs";

let repository: UsersRepository;
let useCase: Authenticate;

describe("User Authenticate Use Case", () => {
  beforeEach(() => {
    repository = new UsersRepository();
    useCase = new Authenticate(repository);
  });

  it("should to authenticate a user", async () => {
    await repository.create({
      name: "John Doe",
      email: "account@email.com",
      password: bcrypt.hashSync("123456", 1),
    });

    await expect(
      useCase.run({
        email: "account@email.com",
        password: "123456",
      })
    ).resolves.toBeTruthy();
  });

  it("should reject invalid authentication", async () => {
    await repository.create({
      name: "John Doe",
      email: "account@email.com",
      password: "123456",
    });

    await expect(
      useCase.run({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
