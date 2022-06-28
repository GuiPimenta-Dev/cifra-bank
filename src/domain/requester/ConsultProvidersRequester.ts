export default interface ConsultProvidersRequesterInterface {
  authorize(id: string): Promise<string>;
  consultProviders(stateCode: number, token: string): Promise<any>;
}
