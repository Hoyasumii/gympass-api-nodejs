import { describe, it, expect, beforeEach } from "vitest";
import { Register } from "./register";
import { UsersRepository } from "@/repositories/in-memory";
import { UserAlreadyExistsError } from "@/use-cases/errors";
import { isBcryptHash } from "@/utils";

let repository: UsersRepository;
let useCase: Register;

describe("User Register Use Case", () => {
  beforeEach(() => {
    repository = new UsersRepository();
    useCase = new Register(repository);
  });

  it("should to register", async () => {
    const { email } = await useCase.run({
      name: "John Doe",
      email: "account@email.com",
      password: "123456",
    });

    expect(email).toBeDefined();
  });

  it("should hash user password upon registration", async () => {
    const { password } = await useCase.run({
      name: "John Doe",
      email: "account@email.com",
      password: "123456",
    });

    const comparePassword = isBcryptHash(password);

    expect(comparePassword).toBeTruthy();
  });

  it("should not be able to register with same email twice", async () => {
    await useCase.run({
      name: "John Doe",
      email: "account@email.com",
      password: "123456",
    });

    await expect(
      useCase.run({
        name: "John Doe",
        email: "account@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
