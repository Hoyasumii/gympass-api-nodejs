export interface UseCaseInterface<Repository, Args, ReturnType> {
  repository: Repository;
  run(data: Args): Promise<ReturnType>;
}
