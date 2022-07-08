import OutputDTO from "../../../dto/OutputDTO";
import HttpClientInterface from "../../http/HttpClient";

export default interface AuthorizeFacadeInterface {
  httpClient: HttpClientInterface;
  authorize(id: string): Promise<OutputDTO>;
}
