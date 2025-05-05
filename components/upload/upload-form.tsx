"use client";
import React from "react";
import UploadFormInout from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";

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
  
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: () => {
      console.error("error occurred while uploading");
      toast.error("Error occurred while uploading file", {
        description: "Please try again later",
      });

    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
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
      toast.error(result.error.flatten().fieldErrors.file?.[0] ?? "Invalid file", {
        description: "Please select a valid file",
      });
      return;
    }

    // upload the flw to uploadthing
    const resp = await startUpload([file]);
    if (!resp) {
        toast.error("Oh shiet, somthing went wrong homie", {
            description: "Please try again later boi",
            
        })
      return;
    }
    toast.success("File is valid", {
        description: "Hang tight, or AI is working on it",
    })

    // parse odf using langchain
    // summarizde the pdf using AI
    // save the usmmry to the database
    // reditrect to the [id] summary page
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInout onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
