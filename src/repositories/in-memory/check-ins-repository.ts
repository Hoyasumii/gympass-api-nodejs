import {
  CheckInsRepositoryInterface,
  InMemoryRepositoryInterface,
} from "@/repositories";
import { CheckIn } from "@/types";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";

export class CheckInsRepository
  implements CheckInsRepositoryInterface, InMemoryRepositoryInterface<CheckIn>
{
  items: Array<CheckIn> = [];

  async create({
    gym_id,
    user_id,
    validated_at = null
  }: Omit<CheckIn, "id" | "created_at">): Promise<CheckIn> {
    const checkInContent: CheckIn = {
      gym_id,
      user_id,
      id: randomUUID(),
      created_at: new Date(),
      validated_at,
    };

    this.items.push(checkInContent);

    return checkInContent;
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date").subtract(1, "second");
    const endOfTheDay = dayjs(date).endOf("date").add(1, "second");

    const checkInOnSameDate = this.items.find((item) => {
      const checkInDate = dayjs(item.created_at);

      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return item.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) return null;

    return checkInOnSameDate;
  }
}
