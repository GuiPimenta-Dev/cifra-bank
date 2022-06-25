export default abstract class DocumentValidator {
  protected clean(value: string): string {
    return value.replace(/\D/g, "");
  }

  protected hasCorrectLength(value: string, length: number) {
    return value.length === length;
  }

  protected isBlocked(value: string) {
    const [firstDigit] = value;
    return [...value].every((digit) => digit === firstDigit);
  }

  abstract calculateDigit(value: string, factor: number): number;
}
