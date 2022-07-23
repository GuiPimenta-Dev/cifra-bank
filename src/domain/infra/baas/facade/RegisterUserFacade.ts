import OutputDTO from "../../../dto/application/OutputDTO";
import ConfirmUserPhoneDTO from "../../../dto/usecase/ConfirmUserPhoneDTO";
import RegisterUserDTO from "../../../dto/usecase/RegisterUserInfoDTO";
import UploadDocumentImageDTO from "../../../dto/usecase/UploadDocumentImageDTO";
import HttpClientInterface from "../../http/HttpClient";
export default interface RegisterUserFacadeInterface {
  httpClient: HttpClientInterface;
  registerUserInfo(input: RegisterUserDTO): Promise<OutputDTO>;
  confirmUserPhone(input: ConfirmUserPhoneDTO): Promise<OutputDTO>;
  uploadDocumentImage(input: UploadDocumentImageDTO): Promise<OutputDTO>;
}
