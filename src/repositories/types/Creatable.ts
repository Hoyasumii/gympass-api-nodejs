export interface Creatable<TargetType, EntryType = TargetType> {
  create(data: EntryType): Promise<TargetType>;
}
