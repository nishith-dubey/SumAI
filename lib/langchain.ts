import {PDFLoader} from '@langchain/community/document_loaders/fs/pdf'

export async function fetchAndExtractPdfText(ufsUrl: string) {

  const res = await fetch(ufsUrl);
  const blob = await res.blob();

  const arrayBuffer = await blob.arrayBuffer();

  const loader = new PDFLoader(new Blob([arrayBuffer]));

  const docs = await loader.load();

  //combine all pages
  return docs.map((doc) => doc.pageContent).join('\n');
}