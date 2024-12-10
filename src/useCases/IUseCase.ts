export interface IUseCase<Repository, Args, ReturnType> {
  repository: Repository;
  run(data: Args): Promise<ReturnType>;
}
