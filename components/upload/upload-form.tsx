"use client";
import React from "react";
import UploadFormInout from "./upload-form-input";
import { z } from "zod";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 24 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine((file) => file.type === "application/pdf", {
        message: "File must be a PDF",
    })
    
});

const UploadForm = () => {
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
      console.log(result.error.flatten().fieldErrors.file?.[0] ?? "Invalid file");
      return;
    }
    // schema with zod
    // upload the flw to uploadthing
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
