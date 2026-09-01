export function convertToCpfCnpj(value: string): string {
  const formatado = value.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    "$1.$2.$3-$4",
  );

  return formatado;
}
