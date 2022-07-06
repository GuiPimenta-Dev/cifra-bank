import OutputDTO from "../../application/dto/OutputDTO";

export default interface UseCaseInterface {
  execute(...args: any[]): Promise<OutputDTO>;
}
