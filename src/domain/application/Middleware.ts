import HttpDTO from "../../application/dto/HttpDTO";

export default interface MiddlewareInterface {
  handle(input: HttpDTO): any;
}
