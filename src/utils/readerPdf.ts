import { PDFParse } from "pdf-parse";

export async function readerPdf(buffer: Buffer) {
  const reader = new PDFParse({ data: buffer });
  const text = await reader.getText();
  const textWithSplit = text.text;
  if (!textWithSplit) return;

  const TIPOS_CARROCERIA = [
    "CARROCERIA ABERTA",
    "CABINE ESTENDIDA",
    "CARROCERIA FECHADA",
    "BASCULANTE",
    "DOLLY",
    "NãO APLICAVEL",
  ];
  const regexs = [
    { name: "renavam", pattern: /^\d{11}$/m },
    { name: "placa", pattern: /[A-Z]{3}\d[A-Z]\d{2}/ },
    {
      name: "cpfCnpj",
      pattern: /\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/,
    },
    {
      name: "local",
      pattern:
        /\b(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)\b/,
    },
  ] as { name: string; pattern: RegExp }[];

  const eixosRegex = / (\d) /;
  const eixos = textWithSplit.match(eixosRegex)?.[1];

  let carroceria;
  TIPOS_CARROCERIA.map((tipo, i) => {
    if (textWithSplit.includes(tipo)) {
      return (carroceria = tipo);
    }
  });

  const datas = regexs.map(({ name, pattern }) => ({
    campo: name,
    valor: pattern.exec(textWithSplit)?.[0],
  }));

  if (carroceria) {
    datas.push({ campo: "Carroceria", valor: carroceria });
  }

  if (eixos) {
    datas.push({ campo: "Eixos", valor: eixos });
  }

  return datas;
}
