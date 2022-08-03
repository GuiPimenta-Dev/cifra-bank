import HttpError from "../../../application/error/HttpError";
import OutputDTO from "../../../domain/dto/application/OutputDTO";
import RegisterAdditionalInfoDTO from "../../../domain/dto/usecase/RegisterAdditionalInfoDTO";
import RegisterAddressInfoDTO from "../../../domain/dto/usecase/RegisterAddressInfoDTO";
import RegisterUserInfoDTO from "../../../domain/dto/usecase/RegisterUserInfoDTO";
import UploadDocumentImageDTO from "../../../domain/dto/usecase/UploadDocumentImageDTO";
import RegisterUserFacadeInterface from "../../../domain/infra/baas/facade/RegisterUserFacade";
import HttpClientInterface from "../../../domain/infra/http/HttpClient";
import AcceptTerm from "../cronos/register_user/AcceptTerm";
import ConsultTerm from "../cronos/register_user/ConsultTerm";
import CreatePassword from "../cronos/register_user/CreatePassword";
import RegisterAdditionalInfo from "../cronos/register_user/RegisterAdditionalInfo";
import RegisterAddressInfo from "../cronos/register_user/RegisterAddressInfo";
import RegisterUserInfo from "../cronos/register_user/RegisterUserInfo";
import UploadDocumentImage from "../cronos/register_user/UploadDocumentImage";
import UploadSelfie from "../cronos/register_user/UploadSelfie";

export default class RegisterUserFacade implements RegisterUserFacadeInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  async registerUserInfo(input: RegisterUserInfoDTO): Promise<OutputDTO> {
    const { document, name, username, email, phone } = input;
    const registerUserInfo = new RegisterUserInfo(this.httpClient);
    if (await registerUserInfo.isUserRegistered(document)) throw new HttpError(400, "User already registered");
    var { data } = await registerUserInfo.registerUserDocument(document);
    var { individual_id: individualId } = data;
    return await registerUserInfo.registerUserPersonalInfo({ individualId, name, username, email, phone });
  }

  async uploadDocumentImage(input: UploadDocumentImageDTO): Promise<OutputDTO> {
    const uploadDocumentImage = new UploadDocumentImage(this.httpClient);
    return await uploadDocumentImage.sendImage(input);
  }

  async registerAdditionalInfo(input: RegisterAdditionalInfoDTO): Promise<OutputDTO> {
    const registerAdditionalInfo = new RegisterAdditionalInfo(this.httpClient);
    return await registerAdditionalInfo.sendInfo(input);
  }

  async uploadSelfie(document: string, file: any): Promise<OutputDTO> {
    const uploadSelfie = new UploadSelfie(this.httpClient);
    return await uploadSelfie.sendSelfie(document, file);
  }

  async registerAddressInfo(input: RegisterAddressInfoDTO): Promise<OutputDTO> {
    const registerAddressInfo = new RegisterAddressInfo(this.httpClient);
    return await registerAddressInfo.registerAddressInfo(input);
  }

  async createPassword(document: string, password: string, confirmPassword: string): Promise<OutputDTO> {
    const createPassword = new CreatePassword(this.httpClient);
    return await createPassword.createPassword(document, password, confirmPassword);
  }

  consultTerm(document: string, term: string): Promise<OutputDTO> {
    const consultTerm = new ConsultTerm(this.httpClient);
    return consultTerm.consultTerm(document, term);
  }

  acceptTerm(document: string, term: string, code: string): Promise<OutputDTO> {
    const acceptTerm = new AcceptTerm(this.httpClient);
    return acceptTerm.acceptTerm(document, term, code);
  }
}
