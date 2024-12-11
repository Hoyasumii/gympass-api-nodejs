import { Gym } from "@/types";

export interface GymsRepositoryInterface {
  findById(id: string): Promise<Gym | undefined>;
  // create(data: Gym): Promise<Gym>;
}
