export default class HttpError extends Error {
  constructor(readonly statusCode: number, message?: string) {
    super(message);
  }
}
