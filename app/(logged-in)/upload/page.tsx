import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";
import { hasReachedUploadLimit } from "@/lib/user";

export const maxDuration = 60;
const UploadPage = async () => {
  const user = await currentUser();
  if (!user?.id) {
    redirect("/sign-in");
   }

   const userId = user?.id;
   const {hasReachedLimit, uploadLimit} = await hasReachedUploadLimit(userId as string);
   if (hasReachedLimit ) {
    redirect("/dashboard");
   }
  return (
    <section className="min-h-screen">
      <div
        className="mx-auto max-w-7xl px-6 
        py-24 sm:py-32 lg:px-8"
      >
        <div className="flex flex-col items-center justify-center 
        gap-6 text-center">
        <UploadHeader />
        <UploadForm />
        </div>
      </div>
    </section>
  );
};

export default UploadPage;
