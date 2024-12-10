import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Register } from "./Register";
import { CheckInsRepository } from "@/repositories/inMemory";

let repository: CheckInsRepository;
let useCase: Register;

describe("Check-in Register Use Case", () => {
  beforeEach(() => {
    repository = new CheckInsRepository();
    useCase = new Register(repository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check-in", async () => {
    const checkIn = await useCase.run({ gymId: "gym-1", userId: "user-1" });

    expect(checkIn.gym_id).toBe("gym-1");
  });

  it("should not be able to check-in in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 11, 10, 0, 0, 0, 0));

    await useCase.run({ gymId: "gym-1", userId: "user-1" });

    await expect(
      useCase.run({ gymId: "gym-1", userId: "user-1" })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check-in in twice in different dates", async () => {
    vi.setSystemTime(new Date(2023, 11, 10, 0, 0, 0, 0));

    await useCase.run({ gymId: "gym-1", userId: "user-1" });

    vi.setSystemTime(new Date(2023, 11, 11, 0, 0, 0, 0));

    await expect(
      useCase.run({ gymId: "gym-1", userId: "user-1" })
    ).resolves.toBeTruthy();
  });
});
