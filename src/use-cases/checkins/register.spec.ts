import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Register } from "./register";
import { CheckInsRepository, GymsRepository } from "@/repositories/in-memory";
import { Decimal } from "@prisma/client/runtime/library";

let checkInsRepository: CheckInsRepository;
let gymsRepository: GymsRepository;
let useCase: Register;

describe("Check-in Register Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new CheckInsRepository();
    gymsRepository = new GymsRepository();

    useCase = new Register(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym-1",
      description: "Testing",
      latitude: new Decimal(-27.2092052),
      longtude: new Decimal(-27.0747279),
      phone: "Testing",
      title: "Testing",
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check-in", async () => {
    const checkIn = await useCase.run({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -27.2092052,
      userLongitude: -27.0747279,
    });

    expect(checkIn.gym_id).toBe("gym-1");
  });

  it("should not be able to check-in in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20));

    await useCase.run({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -27.2092052,
      userLongitude: -27.0747279,
    });

    await expect(
      useCase.run({
        gymId: "gym-1",
        userId: "user-1",
        userLatitude: -27.2092052,
        userLongitude: -27.0747279,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check-in in twice in different dates", async () => {
    vi.setSystemTime(new Date(2023, 11, 10));

    await useCase.run({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -27.2092052,
      userLongitude: -27.0747279,
    });

    vi.setSystemTime(new Date(2024, 11, 11));

    await expect(
      useCase.run({
        gymId: "gym-1",
        userId: "user-1",
        userLatitude: -27.2092052,
        userLongitude: -27.0747279,
      })
    ).resolves.toBeTruthy();
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-2",
      title: "JavaScript Gym",
      description: "JavaScript Gym",
      phone: "",
      latitude: new Decimal(-27.0747279),
      longtude: new Decimal(-49.4889672),
    });

    await expect(useCase.run({
      gymId: "gym-2",
      userId: "user-1",
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })).rejects.toBeInstanceOf(Error);
  });
});
