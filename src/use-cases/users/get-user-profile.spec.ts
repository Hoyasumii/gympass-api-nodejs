import { describe, it, expect, beforeEach } from "vitest";
import { UsersRepository } from "@/repositories/in-memory";
import { ResourceNotFoundError } from "@/use-cases/errors";
import { GetUserProfile } from "./get-user-profile";

let repository: UsersRepository;
let useCase: GetUserProfile;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    repository = new UsersRepository();
    useCase = new GetUserProfile(repository);
  });

  it("should get user data by id", async () => {
    const { id } = await repository.create({
      name: "John Doe",
      email: "account@email.com",
      password: "123456",
    });

    const targetUser = await useCase.run({ id });

    expect(targetUser.name).toBe("John Doe");
  });

  it("should give an error due to the non existent id", async () => {
    await expect(useCase.run({ id: "generic-id" })).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
