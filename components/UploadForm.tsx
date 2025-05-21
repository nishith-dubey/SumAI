"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generateKey } from "crypto";
import { generateSummary } from "@/actions/upload-actions";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

function UploadForm() {

  const [finalSummary, setFinalSummary] = useState(" aa")

  const { startUpload } = useUploadThing("pdfUploader", {
  onClientUploadComplete: (res) => {
    console.log("Upload complete data:", res); // Add this logging
    toast(`Uploaded successfully!`);
  },
  onUploadError: (error) => {
    console.log("Upload error details:", error);
    toast(`Error occurred: ${error.message}`);
  },
  onUploadBegin: (filename) => {
    // toast("Upload started for:", filename);
  },
});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");

    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;

    // Validate file
    const validatedFields = schema.safeParse({ file });
    console.log(validatedFields)
    if (!validatedFields.success) {
      toast(
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      return;
    }

    toast('Uploading PDF, Please wait!')

    try {
      console.log("File to upload:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });
      const res = await startUpload([file]);
      console.log("Upload response:", res);
      if(!res) return;

      //*******//
      console.log('101')
      const summary = await generateSummary(res);
      setFinalSummary(summary.data?.summary);
      console.log(summary.data?.summary)
      // console.log(summary.data?.fileName, summary.data?.pdfText)

    } catch (error) {
      console.error("Upload error:", error);
    }

    // const summary = await generateSummary(res);
  };

  return (
    <div className="flex flex-col items-center justify-center w-[85%]">
      <div className="flex items-center w-[90%] md:w-full justify-center">
        <div className="h-5 lg:w-60 md:w-54 w-40 border-t-2 border-gray-200"></div>
        <div className="h-10 md:mx-5 mx-2 text-sm md:w-auto w-24">
          Upload PDF
        </div>
        <div className="h-5 lg:w-60 md:w-54 w-40 border-t-2 border-gray-200"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex-col flex md:flex-row md:gap-0 gap-3 items-center justify-center  w-full rounded-2xl mt-6 lg:mt-8"
      >
        <Input
          id="file"
          name="file"
          type="file"
          accept="application/pdf"
          required
          className="w-[70%] rounded-none h-full text-xs md:text-lg items-center text-center"
        />
        <button className=" text-white bg-gradient-to-r from-rose-500 to-rose-700 flex items-center justify-center font-semibold tracking-tight transform transition duration-300 ease-in-out hover:-translate-y-2 hover:bg-gradient-to-l w-auto py-2 p-0 px-4 text-xs md:text-lg h-full">
          Upload your PDF
        </button>
      </form>
        {
          <p className="mt-5">{finalSummary}</p>
        }
    </div>
  );
}

export default UploadForm;
