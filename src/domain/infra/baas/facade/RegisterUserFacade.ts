import OutputDTO from "../../../../dto/application/OutputDTO";
import RegisterAdditionalInfoDTO from "../../../../dto/usecase/RegisterAdditionalInfoDTO";
import RegisterAddressInfoDTO from "../../../../dto/usecase/RegisterAddressInfoDTO";
import RegisterUserDTO from "../../../../dto/usecase/RegisterUserInfoDTO";
import UploadDocumentImageDTO from "../../../../dto/usecase/UploadDocumentImageDTO";
import HttpClientInterface from "../../http/HttpClient";

export default interface RegisterUserFacadeInterface {
  httpClient: HttpClientInterface;
  registerUserInfo(input: RegisterUserDTO): Promise<OutputDTO>;
  uploadDocumentImage(input: UploadDocumentImageDTO): Promise<OutputDTO>;
  registerAdditionalInfo(input: RegisterAdditionalInfoDTO): Promise<OutputDTO>;
  uploadSelfie(document: string, file: any): Promise<OutputDTO>;
  registerAddressInfo(input: RegisterAddressInfoDTO): Promise<OutputDTO>;
  createPassword(document: string, password: string, confirmPassword: string): Promise<OutputDTO>;
  consultTerm(document: string, term: string): Promise<OutputDTO>;
  acceptTerm(document: string, term: string, code: string): Promise<OutputDTO>;
}
