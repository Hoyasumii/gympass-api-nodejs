import {
  GymsRepositoryInterface,
  InMemoryRepositoryInterface,
} from "@/repositories";
import { Gym } from "@/types";

export class GymsRepository
  implements GymsRepositoryInterface, InMemoryRepositoryInterface<Gym>
{
  items: Array<Gym> = [];

  async findBy<Key extends keyof Gym>(
    target: Key,
    value: Gym[Key]
  ): Promise<Gym | undefined> {
    return this.items.find((item) => item[target] === value);
  }

  async findById(id: string): Promise<Gym | undefined> {
    return this.items.find((item) => item.id === id);
  }
}
