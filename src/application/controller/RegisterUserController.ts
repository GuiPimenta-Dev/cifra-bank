import InputDTO from "../../domain/dto/application/InputDTO";
import OutputDTO from "../../domain/dto/application/OutputDTO";
import BaasFactory from "../../infra/baas/BaasFactory";
import AxiosAdapter from "../../infra/http/adapter/AxiosAdapter";
import ConfirmUserPhone from "../usecase/register_user/ConfirmUserPhone";
import CreatePassword from "../usecase/register_user/CreatePassword";
import RegisterAdditionalInfo from "../usecase/register_user/RegisterAdditionalInfo";
import RegisterAddressInfo from "../usecase/register_user/RegisterAddressInfo";
import RegisterUserInfo from "../usecase/register_user/RegisterUserInfo";
import UploadDocumentImage from "../usecase/register_user/UploadDocumentImage";
import UploadSelfie from "../usecase/register_user/UploadSelfie";
import UploadSignature from "../usecase/register_user/UploadSignature";

const httpClient = new AxiosAdapter();
const baasFactory = new BaasFactory(httpClient);
const registerUserFacade = baasFactory.createRegisterUserFacade();

export default class RegisterUserController {
  static async registerUserInfo(input: InputDTO): Promise<OutputDTO> {
    const { path, body } = input;
    body.document = path.document;
    const registerUserInfo = new RegisterUserInfo(registerUserFacade);
    return await registerUserInfo.execute(body);
  }

  static async confirmUserPhone(input: InputDTO): Promise<OutputDTO> {
    const { path, body } = input;
    body.document = path.document;
    const confirmUserPhone = new ConfirmUserPhone(registerUserFacade);
    return await confirmUserPhone.execute(body);
  }

  static async uploadDocumentImage(input: InputDTO): Promise<OutputDTO> {
    const { path, body, files } = input;
    const { file } = files;
    file.tmp_name = file.name;
    body.file = file;
    body.document = path.document;
    const uploadDocumentImage = new UploadDocumentImage(registerUserFacade);
    return await uploadDocumentImage.execute(body);
  }

  static async registerAdditionalInfo(input: InputDTO): Promise<OutputDTO> {
    const { path, body } = input;
    body.document = path.document;
    const registerAdditionalInfo = new RegisterAdditionalInfo(registerUserFacade);
    return await registerAdditionalInfo.execute(body);
  }

  static async uploadSignature(input: InputDTO): Promise<OutputDTO> {
    const { path, body, files } = input;
    const { file } = files;
    file.tmp_name = file.name;
    const uploadSignature = new UploadSignature(registerUserFacade);
    return await uploadSignature.execute(path.document, file, body.type);
  }

  static async uploadSelfie(input: InputDTO): Promise<OutputDTO> {
    const { path, files } = input;
    const { file } = files;
    file.tmp_name = file.name;
    const uploadSelfie = new UploadSelfie(registerUserFacade);
    return await uploadSelfie.execute(path.document, file);
  }

  static async registerAddressInfo(input: InputDTO): Promise<OutputDTO> {
    const { path, body } = input;
    body.document = path.document;
    const registerAddressInfo = new RegisterAddressInfo(registerUserFacade);
    return await registerAddressInfo.execute(body);
  }

  static async createPassword(input: InputDTO): Promise<OutputDTO> {
    const { path, body } = input;
    const createPassword = new CreatePassword(registerUserFacade);
    return await createPassword.execute(path.document, body.password, body.confirmPassword);
  }
}
