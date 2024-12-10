import { beforeEach, describe, expect, it } from "vitest";
import { Register } from "./Register";
import { CheckInsRepository } from "@/repositories/inMemory";

let repository: CheckInsRepository;
let useCase: Register;

describe("Check-in Register Use Case", () => {
  beforeEach(() => {
    repository = new CheckInsRepository();
    useCase = new Register(repository);
  });

  it("should be able to checkin", async () => {
    const checkIn = await useCase.run({ gymId: "gym-1", userId: "user-1" });

    expect(checkIn.gym_id).toBe("gym-1");
  });
});
