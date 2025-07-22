// eslint-disable-next-line unicorn/custom-error-definition
export class TorHttpException extends Error {
  // eslint-disable-next-line unicorn/custom-error-definition
  constructor(message: string) {
    super(`[HTTP]: ${message}`);
  }
}
