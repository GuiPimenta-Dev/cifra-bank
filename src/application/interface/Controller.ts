import HttpDTO from "../dto/InputDTO";

export default interface ControllerInterface {
  handle(input: HttpDTO): Promise<any>;
}
