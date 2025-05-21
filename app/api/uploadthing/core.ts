// app/api/uploadthing/core.ts
import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({req}) => {
      const user = await currentUser();

      if(!user) throw new UploadThingError('Unauthorised');
      return { userId: user.id }; 
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // console.log("Upload complete for userId:", metadata.userId);
      // console.log('file url ---------------------', file.ufsUrl)
      // console.log('file 2@@@@@@@@@ ---------------------', file)
      console.log("---------->>>>", file, metadata)
      return { userId: metadata.userId, file  }
      
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;