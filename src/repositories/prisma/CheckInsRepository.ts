import { ICheckInsRepository } from "@/repositories";
import { CheckIn } from "@/types";
import { prisma } from "@/utils";

export class CheckInsRepository implements ICheckInsRepository {
  async create({
    gym_id,
    user_id,
  }: Omit<CheckIn, "id" | "created_at" | "validated_at">): Promise<CheckIn> {
    return await prisma.checkIn.create({
      data: {
        user_id,
        gym_id,
      },
    });
  }
}
