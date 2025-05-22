import { Pizza } from "lucide-react";
import React from "react";
import { MotionDiv, MotionH3 } from "../common/motion-wrapper";
import SummaryViewer from "../summaries/SummaryViewer";

const DEMO_SUMMARY: { role: string; content: string } = {
  role: "assistant",
  content: `# Quick Start Guide\n
. 🚀 Welcome to the Quick Start Guide for our AI-Powered PDF Summarizer!\n
. 📖 This guide will help you get started with the tool and provide an overview of its features.\n

# Installation
. 💾 To install the AI-Powered PDF Summarizer, follow these steps:
. ⬇️ Download the installer from our website.
. 🖱️ Run the installer and follow the on-screen instructions.
. 🚀 Launch the application after installation is complete.

# Features
. 📤 Upload PDF files for instant summarization.
. 📝 View and copy concise summaries.
. 💾 Save summaries to your dashboard for later reference.

# Get Started
. 📂 Click the upload button to select your PDF.
. ⏳ Wait for the AI to process and summarize your document.
. ✅ Review your summary and save it if you wish.`,
};

const DemoSection = () => {
  return (
    <section className="relative">
      <div
        className="py-12 lg:py-24 max-w-5xl mx-auto
      px-4 sm:px-6 lg:px-8 lg:pt-12"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div
            className="inline-flex  items-center justify-center
            p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs
            border-gray-500/20 mb-4"
          >
            <Pizza className="h-6 w-6 text-sky-600 " />
          </div>
          <div className="text-center mb-16">
            <MotionH3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
            >
              Watch how it works!
            </MotionH3>
          </div>
          
        </div>
        <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
            {/* sammry viewer */}
            <MotionDiv
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SummaryViewer summary={DEMO_SUMMARY} />
            </MotionDiv>
          </div>
      </div>
    </section>
  );
};

export default DemoSection;
