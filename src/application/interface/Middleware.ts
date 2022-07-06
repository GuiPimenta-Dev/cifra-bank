import HttpDTO from "../dto/InputDTO";

export default interface MiddlewareInterface {
  handle(input: HttpDTO): any;
}
