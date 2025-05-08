import SourceInfo from "@/components/summaries/SourceInfo";
import { getSummaryById } from "@/components/summaries/summary";
import Summaryheader from "@/components/summaries/summary-header";
import SummaryViewer from "@/components/summaries/SummaryViewer";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

const SummaryPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const summary = await getSummaryById(id);
  if (!summary) {
    notFound();
  }

  const { title, summary_text, file_name, created_at, word_count } = summary;
  const readingTime = Math.ceil((word_count || 0 )/ 200); // Assuming an average reading speed of 200 words per minute
  return (
    <div className="raltive isolate min-h-screen">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          <div className="flex flex-col">
            <Summaryheader createdAt={created_at} title={title}
            readingTime={readingTime} />
          </div>
          {file_name && (
            <SourceInfo 
              fileName={file_name}
              summaryText={JSON.parse(summary_text)}
              originalFileUrl={`/dashboard/summaries/${id}`}
              title={title}
              createdAt={created_at}
            />
          )}
          <div className="relative mt-4 sm:mt-8 lg:mt-16">
            <div
              className="relative p-4 sm:p-6 lg:p-8
              bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl 
              border border-sky-100/30 transition-all duration-300 hover:shadow-2xl
              hover:bg-white/90 max-w-4xl mx-auto"
            >
              <div
                className="absolute inset-0
                          bg-linear-to-brfrom-sky-50/50
                          via-orange-50
                          30 to-transparent opacity-50 rounded-2xl
                          sm:rounded-3xl"
              />

              <div
                className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5
                            sm:gap-2 text-xs sm:text-sm
                            text-muted-foreground bg-white/90 px-2 sm:px-3
                            py-1 sm:py-1.5 rounded-full shadow-xs"
              >
                <FileText
                  className="h-3 w-3 sm:h-4
                            sm:w-4
                            text-sky-400"
                />
                {summary.word_count?.toLocaleString()} words
              </div>

              <div className="relative mt-8 sm:mt-6 flex justify-center">
                <SummaryViewer summary={JSON.parse(summary.summary_text)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
