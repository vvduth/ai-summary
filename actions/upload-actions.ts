"use server";

import { summarizeTextFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdftext } from "@/lib/langChain";
import { summarizeTextFromOpenAI } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { getDbConnection } from "./db-actions";
import { formatFileNameAsTitle } from "@/utils/format";
import { revalidatePath } from "next/cache";

interface PDFSummaryType {
  userid?: string;
  fileUrl: string;
  summary: string;
  title?: string;
  fileName?: string;
}

export async function generatePdfSummary(
  uploadresponse: [
    {
      serverData: {
        userId: string;
        fileName: string;
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
    serverData: { userId, fileName },
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
    } catch (error) {
      console.error("Error occurred while summarizing text: ", error);
      // call gemini
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await summarizeTextFromGemini(pdfText);
        } catch (geminiError) {
          console.error(
            "Gemini API failer after openai quota exceeded",
            geminiError
          );
          throw new Error("Gemini API failed after OpenAI quota exceeded");
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "No summary generated",
        data: null,
      };
    }

    const formatedFilename = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "Summary generated successfully",
      data: { 
        title: formatedFilename, 
        summary },
    };
  } catch (error) {
    console.error("Error occurred while generating summary: ", error);
    return {
      success: false,
      message: "Error occurred while generating summary",
      data: null,
    };
  }
}

async function savePdfSummaryToDB({
  userid,
  fileUrl,
  summary,
  title,
  fileName,
}: PDFSummaryType) {
  try {
    const sql = await getDbConnection();
    await sql`INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, title, file_name)
    VALUES (
        ${userid},
        ${fileUrl},
        ${summary},
        ${title},
        ${fileName}
    );`;
    return true;
  } catch (error) {
    console.error("Error saving pdf summary", error);
    throw error;
  }
}
export async function storePDFSummary({
  fileUrl,
  summary,
  title,
  fileName,
}: PDFSummaryType) {
  let savePdfSummary:any;
  try {
    // get clerk user id from server side
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "No user id found",
        data: null,
      };
    }

    savePdfSummary = await savePdfSummaryToDB({
      userid: userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savePdfSummary) {
      return {
        success: false,
        message: "No summary saved, please try again",
        data: null,
      };
    }

    revalidatePath(`/summary/${savePdfSummary.id}`);

    return {
      success: true,
      message: "Summary saved successfully",
      data: {
        id: savePdfSummary.id,
        
      }
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error occurred while storing summary",
      data: null,
    };
  }
}
