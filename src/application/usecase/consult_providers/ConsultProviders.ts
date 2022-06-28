import ConsultProvidersRequesterInterface from "../../../domain/requester/ConsultProvidersRequester";

export default class ConsultProviders {
  constructor(private requester: ConsultProvidersRequesterInterface) {}

  async execute(cpf: string, stateCode: number): Promise<any> {
    const token = await this.requester.authorize(cpf);
    const { providers } = await this.requester.consultProviders(stateCode, token);
    return { providers };
  }
}
