export function removeFormatCpfCnpj(value: string): string {
  return value.replace(/\D/g, '')
}
