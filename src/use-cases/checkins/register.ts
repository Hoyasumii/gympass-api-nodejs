import { CheckInsRepositoryInterface } from "@/repositories";
import { CheckIn } from "@/types";
import { UseCaseInterface } from "@/use-cases";

interface IRegister {
  gymId: string;
  userId: string;
}

export class Register
  implements UseCaseInterface<CheckInsRepositoryInterface, IRegister, CheckIn>
{
  constructor(public repository: CheckInsRepositoryInterface) {}

  async run({ gymId, userId }: IRegister): Promise<CheckIn> {
    const checkInOnSameDay = await this.repository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) throw new Error(JSON.stringify(checkInOnSameDay));

    const checkInData = await this.repository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return checkInData;
  }
}
