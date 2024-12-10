import { CheckIn } from "@/types";

export interface CheckInsRepositoryInterface {
  create(
    data: Omit<CheckIn, "id" | "created_at" | "validated_at">
  ): Promise<CheckIn>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
}
