import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  paymenLink: string;
  priceId: string;
  id: string;
};
const plans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "0",
    description: "Basic features for free",
    features: [
      "Upload up to 5 PDFs per month",
      "Basic summary generation",
      "Limited access to advanced features",
    ],
    paymenLink: "",
    priceId: "",
  },
  {
    name: "Pro",
    id: "pro",
    price: "9.99",
    description: "Advanced features for professionals",
    features: [
      "Upload up to 20 PDFs per month",
      "Advanced summary generation",
      "Access to premium features",
    ],
    paymenLink: "",
    priceId: "",
  },
  {
    name: "Enterprise",
    id: "enterprise",
    price: "29.99",
    description: "Custom solutions for businesses",
    features: [
      "Unlimited PDF uploads",
      "Custom summary generation options",
      "Dedicated support and training",
    ],
    paymenLink: "",
    priceId: "",
  },
];
const PricingSection = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50" id="pricing">
      <div
        className="py-12 lg:py-24 max-w-5xl mx-auto
      px-4 sm:px-6 lg:px-8 lg:pt-12"
      >
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="uppercase font-bold text-xl mb-8 text-sky-500">Pricing</h2>
        </div>
        <div
          className="realtive flex justify-center flex-col lg:flex-row items-center lg:items-stretch
           gap-8"
        >
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({
  id,
  name,
  price,
  description,
  paymenLink,
  features,
}: PricingPlan) => {
  return (
    <div className="realtive w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
      <div
        className={cn(
          `relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px]
            border-gray-500/20 rounded-2xl`,
          id === "free" && "border-gray-500/20 gap-5 border-2",
          id === "pro" && "border-sky-500/20 gap-5 border-2",
          id === "enterprise" && "border-sky-700 gap-5 border-2"
        )}
      >
        <div>
          <div className="flex justify-between items-center gap-4">
            <div>
              <p className="text-lg lg:text-xl font-bold uppercase">{name}</p>
              <p className="text-base-content/80 mt-2">{description}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">€{price}</p>
          <div className="flex flex-col justify-end">
            <p className="text-xs uppercase font-semibold">EUR</p>
            <p className="text-xs">/month</p>
          </div>
        </div>

        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckIcon size={18} />
              <span>{feature}</span>
            </li>
          ))}
        </div>

        <div className="space-y-2 flex justify-center w-full">
          <Link href={paymenLink} className={cn(`w-full rounded-full flex items-center justify-center
          gap-2 bg-sky-500 font-semibold text-white border-2 py-2`,
          id === "free" && "bg-gray-500/20 border-gray-500/20",
            id === "pro" && "bg-sky-500 border-sky-500",
            id === "enterprise" && "bg-sky-700 border-sky-700"
          )}>Buy now</Link>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
