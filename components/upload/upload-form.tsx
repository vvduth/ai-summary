"use client";
import React, { forwardRef, useState } from "react";
import UploadFormInout from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePdfSummary, storePDFSummary } from "@/actions/upload-actions";
import { useRouter } from "next/navigation";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 24 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "File must be a PDF",
    }),
});

const UploadForm = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: () => {
      console.error("error occurred while uploading");
      toast.error("Error occurred while uploading file", {
        description: "Please try again later ",
      });
    },
    onUploadBegin: (fileName) => {
      console.log("upload has begun for", fileName);
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;
      if (!file) {
        alert("Please select a file to upload.");
        return;
      }

      // validate the field
      const result = schema.safeParse({ file });
      if (result.success === false) {
        console.log(
          result.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
        );
        toast.error(
          result.error.flatten().fieldErrors.file?.[0] ?? "Invalid file",
          {
            description: "Please select a valid file",
          }
        );
        return;
      }

      // upload the flw to uploadthing
      const resp = await startUpload([file]);
      if (!resp) {
        toast.error("Oh shiet, somthing went wrong homie", {
          description: "Please try again later boi",
        });
        return;
      }
      toast.success("File is valid", {
        description: "Hang tight, or AI is working on it",
      });

      // parse odf using langchain
      const summary = await generatePdfSummary(resp as any);
      const { data = null, message = null } = summary || {};

      if (!data) {
        toast.error(message || "Error occurred while generating summary", {
          description: "Please try again laterrr",
        });
        return;
      }
      if (data) {
        let storeResult: any;
        toast.success("Saving PDF summary to database", {
          description: "Please wait a moment",
        });

        if (data.summary) {
          storeResult = await storePDFSummary({
            fileUrl: resp[0].serverData.fileUrl,
            summary: data.summary as string,
            title: data.title,
            fileName: file.name,
          });
          toast.success("PDF summary saved successfully", {
            description: "You can view the summary in your dashboard",
          });
        }

        formRef.current?.reset();
        router.push(`/summaries/${storeResult.data.id}`);
      }
    } catch (error) {
      console.error("Error occurred while uploading file", error);
      toast.error("Error occurred while uploading file", {
        description: "Please try again laterrrr ",
      });
      setIsLoading(false);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }

    // summarizde the pdf using AI
    // save the usmmry to the database
    // reditrect to the [id] summary page
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInout
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UploadForm;
