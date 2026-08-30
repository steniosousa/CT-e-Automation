import xml2js from "xml2js";

export default async function ReaderXML(file: Buffer) {
  const parser = new xml2js.Parser({ explicitArray: false, trim: true });
  const persed = await parser.parseStringPromise(file);

  
  return persed;
}
