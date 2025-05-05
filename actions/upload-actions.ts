'use server'

import { fetchAndExtractPdftext } from "@/lib/langChain";

export async function generatePdfSummary(uploadresponse:  [{
    serverData: {
        userId: string; 
    },
    file: {
        ufsUrl: string; 
        name: string;
    }
}]) {
    if (!uploadresponse) {
        return {
            sucess: false,
            message: "No file uploaded",
            data: null 
        }
    }
    const { serverData: {
        userId
    }, file: {
        ufsUrl: pdfUrl, name: fileName
    } } = uploadresponse[0];

    if (!pdfUrl) {
        return {
            sucess: false,
            message: "No file uploaded",
            data: null 
        }
    }
    try {
        const pdfText = await fetchAndExtractPdftext(pdfUrl);
        console.log("pdfText", pdfText);
    } catch (error) {
        return {
            sucess: false,
            message: "Error occurred while generating summary",
            data: null 
        }
    }
}