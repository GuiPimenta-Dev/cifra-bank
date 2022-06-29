export default interface ConsultNationalProvidersRequesterInterface {
  authorize(id: string): Promise<string>;
  consultNationalProviders(stateCode: number, token: string): Promise<any>;
}
