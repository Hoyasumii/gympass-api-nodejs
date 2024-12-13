import {
  CheckInsRepositoryInterface,
  GymsRepositoryInterface,
} from "@/repositories";
import { CheckIn } from "@/types";
import { UseCaseInterface } from "@/use-cases";
import { ResourceNotFoundError } from "@/use-cases/errors";
import { getDistanceBetweenCoordinates } from "@/utils";

interface IRegister {
  gymId: string;
  userId: string;
  userLatitude: number;
  userLongitude: number;
}

export class Register implements UseCaseInterface<unknown, IRegister, CheckIn> {
  public repository = {};

  constructor(
    private checkInsRepository: CheckInsRepositoryInterface,
    private gymsRepository: GymsRepositoryInterface
  ) {}

  async run({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: IRegister): Promise<CheckIn> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) throw new ResourceNotFoundError();

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longtude.toNumber() }
    );

    const maxDistanceInKilometers = 0.1;

    if (distance > maxDistanceInKilometers) {
      throw new Error();
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) throw new Error(JSON.stringify(checkInOnSameDay));

    const checkInData = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return checkInData;
  }
}
