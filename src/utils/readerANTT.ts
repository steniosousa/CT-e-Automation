import { PDFParse } from "pdf-parse";

export async function ReaderANTT(file: Buffer): Promise<string | undefined> {
  const parser = new PDFParse({ data: file });

  try {
    const { info } = await parser.getInfo();
    const title = info?.Title ?? "";
    const numero = title.match(/(\d+)/)?.[1];

    if (!numero) return undefined;

    return String(Number(numero));
  } finally {
    await parser.destroy();
  }
}
