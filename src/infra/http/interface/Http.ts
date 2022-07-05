import ControllerInterface from "../../../domain/application/Controller";

export default interface HttpInterface {
  on(url: string, method: string, fn: ControllerInterface, authorize?: boolean): void;
  listen(port: number): void;
}
