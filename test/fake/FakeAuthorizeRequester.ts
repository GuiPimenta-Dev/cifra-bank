export default class FakeAuthorizerRequester {
  async authorize(id: string): Promise<string> {
    return "1234";
  }
}
