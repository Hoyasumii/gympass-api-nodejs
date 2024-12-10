import { CheckInsRepositoryInterface, IInMemoryRepository } from "@/repositories";
import { CheckIn } from "@/types";
import { randomUUID } from "node:crypto";

export class CheckInsRepository
  implements CheckInsRepositoryInterface, IInMemoryRepository<CheckIn>
{
  items: Array<CheckIn> = [];

  async create({
    gym_id,
    user_id,
  }: Omit<CheckIn, "id" | "created_at" | "validated_at">): Promise<CheckIn> {
    const checkInContent: CheckIn = {
      gym_id,
      user_id,
      id: randomUUID(),
      created_at: new Date(),
      validated_at: null,
    };

    this.items.push(checkInContent);

    return checkInContent;
  }

  async findByUserIdOnDate(
    userId: string,
    _date: Date
  ): Promise<CheckIn | null> {
    const checkInOnSameDate = this.items.find(
      (item) => item.user_id === userId
    );

    if (!checkInOnSameDate) return null;

    return checkInOnSameDate;
  }
}
