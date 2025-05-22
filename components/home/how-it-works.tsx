import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";
import React from "react";
import { MotionDiv, MotionH2, MotionH3 } from "../common/motion-wrapper";

type Step = {
  icon: React.ReactNode;
  label: string;
  description: string;
};
const steps: Step[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: "Drop Your PDF Like It's Hot",
    description: "Toss your PDF into our magic machine.",
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: "Let the AI Flex",
    description: "Our AI will flex its brainpower and do the heavy lifting.",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: "Snag Your SparkNotes",
    description: "Grab a slick summary of your file, hassle-free.",
  },
];
const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div
        className="py-12 lg:py-24 max-w-5xl mx-auto
      px-4 sm:px-6 lg:px-8 lg:pt-12"
      >
        <div className="text-center mb-16">
          <MotionH2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-4xl uppercase mb-4 text-sky-500">
            How we roll
          </MotionH2>
          <MotionH3 
           initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-bold text-center text-3xl max-w-2xl mask-auto">
            One PDF, 3 steps, and you're living the dream!
          </MotionH3>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8
        max-w-6xl mx-auto relative"
        >
          {steps.map((step, index) => (
            <MotionDiv 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            key={index} className="">
              <StepItem key={index} {...step} />
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

function StepItem({ icon, label, description }: Step) {
  return (
    <div
      className="flex flex-col items-center justify-center 
    text-center p-4 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4 text-sky-600">{icon}</div>
      <h3 className="font-bold text-xl mb-2">{label}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default HowItWorks;
