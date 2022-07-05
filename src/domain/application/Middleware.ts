import HttpDTO from "../../application/dto/HttpDTO";
import ControllerInterface from "./Controller";

export default interface MiddlewareInterface {
  setNext(nextHandler: ControllerInterface): void;
  handle(input: HttpDTO): any;
}
