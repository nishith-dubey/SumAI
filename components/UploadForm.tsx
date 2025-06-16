"use client";

import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generateKey } from "crypto";
import {
  generateSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { Loader, Snowflake } from "lucide-react";
import { Router } from "next/router";
import { useRouter } from "next/navigation";


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
  const formRef1 = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [finalSummary, setFinalSummary] = useState("");
  const router = useRouter();


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

    try {
      console.log("submitted");
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      // Validate file
      const validatedFields = schema.safeParse({ file });
      console.log(validatedFields);
      if (!validatedFields.success) {
        toast(
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file"
        );
        setIsLoading(false);
        return;
      }

      toast("Uploading PDF, Please wait!");

      try {
        console.log("File to upload:", {
          name: file.name,
          size: file.size,
          type: file.type,
        });
        const res = await startUpload([file]);
        console.log("Upload response:", res);
        if (!res) {
          setIsLoading(false);
          return;
        }

        //*******//
        console.log("101");
        const result = await generateSummary(res);
        console.log(result.data);
        setFinalSummary(result.data?.summary)
        const summary = result.data?.summary;

        if (summary) {
          setIsLoading(false);
          toast(
            `Saving PDF.......!\n\nHang tight, we are saving your summary!`
          );
        }

        let storeResult: any;
        if (summary) {
          storeResult = await storePdfSummaryAction({
            fileUrl: res[0].serverData.file.url,
            summary,
            title: result.data?.formattedFileName,
            fileName: file.name,
          });

          toast(
            "Summary Generated! \n Your PDF has been successfully summarised and saved!"
          );
        }
        

        formRef1.current?.reset();
        //redirect to summary [id] page
        router.push(`/summaries/${storeResult.data.id}`)

      } catch (error) {
        setIsLoading(false);
        console.error("Upload error:", error);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Something went wrong:", error);
    } finally {
      setIsLoading(false);
    }
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
        ref={formRef1}
        onSubmit={handleSubmit}
        className="flex-col flex md:flex-row gap-4 roun items-center justify-center  w-full rounded-2xl mt-6 lg:mt-8"
      >
        <Input
          id="file"
          name="file"
          type="file"
          accept="application/pdf"
          required
          disabled = {isLoading}
          className="w-[70%] rounded-none h-full text-md md:text-lg items-center text-center"
        />
        {!isLoading ? (
          <button className=" text-white bg-gradient-to-r from-rose-500 to-rose-700 flex items-center justify-center font-semibold tracking-tight transform transition duration-300 ease-in-out hover:bg-gradient-to-l w-auto py-2 p-0 px-4 text-md md:text-lg h-full rounded-lg">
            Upload your PDF
          </button>
        ) : (
          <button
            disabled={true}
            className=" text-white bg-rose-400 flex items-center justify-center font-semibold tracking-tight w-auto py-2 p-0 px-4 text-md md:text-lg h-full cursor-not-allowed rounded-lg"
          >
            <Snowflake className="animate-spin mr-2" size={24} />
            Please wait ...
          </button>
        )}
      </form>
      {<p className="mt-5">{finalSummary}</p>}
    </div>
  );
}

export default UploadForm;
