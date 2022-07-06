import HttpDTO from "../../application/dto/InputDTO";

export default interface ControllerInterface {
  handle(input: HttpDTO): Promise<any>;
}
