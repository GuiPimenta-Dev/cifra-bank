import HttpError from "../../../application/error/HttpError";
import OutputDTO from "../../../domain/dto/application/OutputDTO";
import RegisterUserInfoDTO from "../../../domain/dto/usecase/RegisterUserInfoDTO";
import RegisterUserFacadeInterface from "../../../domain/infra/baas/facade/RegisterUserFacade";
import HttpClient from "../../../domain/infra/http/HttpClient";
import RegisterUserInfo from "../cronos/register_user/RegisterUserInfo";

export default class RegisterUserFacade implements RegisterUserFacadeInterface {
  constructor(readonly httpClient: HttpClient) {}
  async registerUserInfo(input: RegisterUserInfoDTO): Promise<OutputDTO> {
    const { document, name, username, email, phone } = input;
    const registerUserInfo = new RegisterUserInfo(this.httpClient);
    if (await registerUserInfo.isUserRegistered(document)) throw new HttpError(400, "User already registered");
    var { data } = await registerUserInfo.registerUserDocument(document);
    var { individual_id: transactionId } = data;
    var { data } = await registerUserInfo.registerUserPersonalInfo({ transactionId, name, username, email });
    var { individual_id: transactionId } = data;
    return await registerUserInfo.registerUserPhone(transactionId, phone.stateCode, phone.number);
  }
}
