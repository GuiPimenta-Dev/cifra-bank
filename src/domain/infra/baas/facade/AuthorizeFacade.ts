import OutputDTO from "../../../dto/application/OutputDTO";
import HttpClientInterface from "../../http/HttpClient";

export default interface AuthorizeFacadeInterface {
  httpClient: HttpClientInterface;
  authorize(id: string, username: string, password: string): Promise<OutputDTO>;
}
