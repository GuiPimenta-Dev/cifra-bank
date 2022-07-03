export default interface UseCaseInterface {
  execute(...args: any[]): Promise<any>;
}
