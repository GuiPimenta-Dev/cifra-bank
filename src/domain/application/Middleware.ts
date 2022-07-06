import HttpDTO from "../../application/dto/InputDTO";

export default interface MiddlewareInterface {
  handle(input: HttpDTO): any;
}
