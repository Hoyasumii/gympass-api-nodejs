export interface Findable<TargetType, ReturnType = TargetType> {
  findById(id: string): Promise<ReturnType | undefined>;
  findBy<Key extends keyof TargetType>(
    target: Key,
    value: TargetType[Key]
  ): Promise<ReturnType | undefined>;
}
