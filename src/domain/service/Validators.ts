export function clean(value: string): string {
  return value.replace(/\D/g, "");
}

export function hasCorrectLength(value: string | number, length: number): boolean {
  return value.toString().length === length;
}

export function isBlocked(value: string) {
  const [firstDigit] = value;
  return [...value].every((digit) => digit === firstDigit);
}
