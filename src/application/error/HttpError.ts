export default class HttpError extends Error {
  constructor(readonly statusCode: number, message?: any) {
    super(message);
  }
}
