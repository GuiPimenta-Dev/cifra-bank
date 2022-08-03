import InputDTO from "../../domain/dto/application/InputDTO";
import OutputDTO from "../../domain/dto/application/OutputDTO";
import BaasFactory from "../../infra/baas/BaasFactory";
import AxiosAdapter from "../../infra/http/adapter/AxiosAdapter";
import AcceptTerm from "../usecase/register_user/AcceptTerm";
import ConsultTerm from "../usecase/register_user/ConsultTerm";
import CreatePassword from "../usecase/register_user/CreatePassword";
import RegisterAdditionalInfo from "../usecase/register_user/RegisterAdditionalInfo";
import RegisterAddressInfo from "../usecase/register_user/RegisterAddressInfo";
import RegisterUserInfo from "../usecase/register_user/RegisterUserInfo";
import UploadDocumentImage from "../usecase/register_user/UploadDocumentImage";
import UploadSelfie from "../usecase/register_user/UploadSelfie";

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

  static async uploadDocumentImage(input: InputDTO): Promise<OutputDTO> {
    const { path, body, file } = input;
    body.file = file.path;
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

  static async uploadSelfie(input: InputDTO): Promise<OutputDTO> {
    const { path, file } = input;
    const uploadSelfie = new UploadSelfie(registerUserFacade);
    return await uploadSelfie.execute(path.document, file.path);
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

  static async consultTerm(input: InputDTO): Promise<OutputDTO> {
    const { path, body } = input;
    const consultTerm = new ConsultTerm(registerUserFacade);
    return await consultTerm.execute(path.document, body.term);
  }

  static async acceptTerm(input: InputDTO): Promise<OutputDTO> {
    const { path, body } = input;
    const acceptTerm = new AcceptTerm(registerUserFacade);
    return await acceptTerm.execute(path.document, body.term, body.code);
  }
}
