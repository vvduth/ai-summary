
import {PDFLoader }from "@langchain/community/document_loaders/fs/pdf";
export async function fetchAndExtractPdftext(pdfUrl: string) {
 const resposne = await fetch(pdfUrl, {})
 const blob = await resposne.blob();

 const arrayBuffer = await blob.arrayBuffer();
 const loader = new PDFLoader(new Blob([arrayBuffer]))

 const docs = await loader.load();

 return docs.map((doc) => doc.pageContent).join("\n");

}