export default abstract class DocumentValidator {
  protected clean(cpf: string): string {
    return cpf.replace(/\D/g, "");
  }

  protected hasCorrectLength(cpf: string, length: number) {
    return cpf.length === length;
  }

  protected isBlocked(cpf: string) {
    const [firstDigit] = cpf;
    return [...cpf].every((digit) => digit === firstDigit);
  }

  abstract calculateDigit(value: string, factor: number): number;
}
