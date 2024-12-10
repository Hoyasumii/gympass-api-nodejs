import { ICheckInsRepository } from "@/repositories";
import { CheckIn } from "@/types";
import { IUseCase } from "@/useCases";

interface IRegister {
  gymId: string;
  userId: string;
}

export class Register
  implements IUseCase<ICheckInsRepository, IRegister, CheckIn>
{
  constructor(public repository: ICheckInsRepository) {}

  async run({ gymId, userId }: IRegister): Promise<CheckIn> {
    const checkInData = await this.repository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return checkInData;
  }
}