import EmptySummariesState from "@/components/summaries/empty-summaries";
import SummaryCard from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { getSummaryByUserId } from "@/lib/summary";
import { hasReachedUploadLimit } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
    const user = await currentUser();
    const userId = user?.id;
    if (!user?.id) {
        return redirect("/sign-in");
    }
  const {hasReachedLimit, uploadLimit} = await hasReachedUploadLimit(userId as string);
  const summaries = await getSummaryByUserId(userId as string);
  return (
    <main className="min-h-screen">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="flex flex-col gap-6 mt-6">
          <h1 className="text-4xl">Your summaries</h1>
        <p>
          Welcome to the dashboard, where your summaries are cooler than the
          other side of the pillow!
        </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          {!hasReachedLimit && (
            <Button
            variant={"link"}
            className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-md shadow-md"
          >
            <Link href={"/upload"} className="flex items-center text-white">
              <Plus className="w-5 h-5 mr-2" />
              New summary
            </Link>
          </Button>
          )}
        </div>
      </div>
      {
        hasReachedLimit && (
          <div className="container mb-6">
        <div
          className="bg-sky-50 border border-sky-200 rounded-lg
            p-4 text-sky-800"
        >
          <p className="text-sm">
            You have reached the limit of {uploadLimit} upload of gree plan.{" "}
            <Link
              href={"/pricing"}
              className="text-blue-500 underline
                font-medium underline-offset-4 inline-flex items-center"
            >
              Upgrade to pro <ArrowRight className="w-4 h-4 inline-block" />
            </Link>
            for unlimited upload and more features.
          </p>
        </div>
      </div>
        )
      }
      {summaries.length > 0 ? (
        <div
        className="container grid grid-cols-1 gap-4 sm:gap-6
        md:grid-cols-2 lg:grid-cols-3 sm:px-0"
      >
        {summaries.map((_, index) => (
          <SummaryCard key={index} summary={_} />
        ))}
      </div>
      ): (
        <div>
          <EmptySummariesState />
        </div>
      )}
    </main>
  );
};

export default DashboardPage;
