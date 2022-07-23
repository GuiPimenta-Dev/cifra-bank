import OutputDTO from "../../../dto/application/OutputDTO";
import RegisterUserDTO from "../../../dto/usecase/RegisterUserInfoDTO";
import HttpClientInterface from "../../http/HttpClient";

export default interface RegisterUserFacadeInterface {
  httpClient: HttpClientInterface;
  registerUserInfo(input: RegisterUserDTO): Promise<OutputDTO>;
}
