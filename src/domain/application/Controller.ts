import HttpDTO from "../../application/dto/HttpDTO";

export default interface ControllerInterface {
  handle(input: HttpDTO): Promise<any>;
}
