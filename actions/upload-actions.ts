
"use server"

import { fetchAndExtractPdftext } from "@/lib/langChain";
import { summarizeTextFromOpenAI } from "@/lib/openai";

export async function generatePdfSummary(
  uploadresponse: [
    {
      serverData: {
        userId: string;
      };
      ufsUrl: string;
    }
  ]
) {
  if (!uploadresponse) {
    return {
      success: false,
      message: "No file uploadresponse uploaded",
      data: null,
    };
  }
  const {
    serverData: { userId },
    ufsUrl: pdfUrl,
  } = uploadresponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "No file uploaded",
      data: null,
    };
  }
  try {
    const pdfText = await fetchAndExtractPdftext(pdfUrl);
    let summary;
    try {
      summary = await summarizeTextFromOpenAI(pdfText);
      console.log( summary);
    } catch (error) {
      console.error("Error occurred while summarizing text: ", error);
    }

    if (!summary) {
      return {
        success: false,
        message: "No summary generated",
        data: null,
      };
    }

    return {
        success: true,
        message: "Summary generated successfully",
        data: {summary},
    }
  } catch (error) {
    return {
      success: false,
      message: "Error occurred while generating summary",
      data: null,
    };
  }
}
