import SummaryCard from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  const uploadLimit = 5; // Example limit
  const summaries = [
    {
      id: 1,
      title: "Summary 1",
      created_at: "2024-01-01",
      original_file_url: "https://example.com/file1.pdf",
      summary_text: "This is a summary of the first file.",
      status: "completed",
    },
    {
      id: 2,
      status: "pending",
      title: "Summary 2",
      created_at: "2024-01-02",
      summary_text: "This is a summary of the second file.",
      original_file_url: "https://example.com/file2.pdf",
    },
    {
      id: 3,
      status: "in-progress",
      title: "Summary 3",
      summary_text: "This is a summary of the third file.",
      created_at: "2024-01-03",
      original_file_url: "https://example.com/file3.pdf",
    },
    {
      id: 4,
      status: "completed",
      title: "Summary 4",
      summary_text: "This is a summary of the fourth file.",
      created_at: "2024-01-04",
      original_file_url: "https://example.com/file4.pdf",
    },
    {
      id: 5,
      status: "completed",
      summary_text: "This is a summary of the fifth file.",
      title: "Summary 5",
      created_at: "2024-01-05",
      original_file_url: "https://example.com/file5.pdf",
    },
  ];
  return (
    <main className="min-h-screen">
      <div className="container mx-auto flex flex-col gap-4">
        <h1>Your summaries</h1>
        <p>
          Welcome to the dashboard, where your summaries are cooler than the
          other side of the pillow!
        </p>
        <div className="flex justify-between items-center mt-4">
          <Button
            variant={"link"}
            className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-md shadow-md"
          >
            <Link href={"/upload"} className="flex items-center text-white">
              <Plus className="w-5 h-5 mr-2" />
              New summary
            </Link>
          </Button>
        </div>
      </div>
      <div className="mb-6">
        <div
          className="bg-sky-50 border border-sky-200 rounded-lg
            p-4 text-sky-800"
        >
          <p className="text-sm">
            You have reached the limit of 5 upload of gree plan.{" "}
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
      <div
        className="grid grid-cols-1 gap-4 sm:gap-6
        md:grid-cols-2 lg:grid-cols-3 sm:px-0"
      >
        {summaries.map((_, index) => (
          <SummaryCard key={index} summary={_} />
        ))}
      </div>
    </main>
  );
};

export default DashboardPage;
