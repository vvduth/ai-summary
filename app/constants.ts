import { PricingPlan } from "@/components/home/pricing-section";

export const plans: PricingPlan[] = [
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
    paymenLink: process.env.NODE_ENV === 'development' ? '': '',
    priceId: "",
  },
  {
    name: "Basic",
    id: "basic",
    price: "9.99",
    description: "Advanced features for professionals",
    features: [
      "Upload up to 5 PDFs per month",
      "Advanced summary generation",
      "Access to premium features",
    ],
    paymenLink: process.env.NODE_ENV === 'development' ? 
    'https://buy.stripe.com/test_14A8wOdJPh2Wb1D9aqffy00': '',
    priceId: "price_1RR8QzCzuRDSbLjDFzrhTiwe",
  },
  {
    name: "Pro",
    id: "pro",
    price: "19.99",
    description: "Custom solutions for businesses",
    features: [
      "Unlimited PDF uploads",
      "Custom summary generation options",
      "Dedicated support and training",
    ],
    paymenLink: process.env.NODE_ENV === 'development' ? 
    'https://buy.stripe.com/test_8x2fZgbBHaEy1r3aeuffy01': '',
    priceId: "price_1RR8UoCzuRDSbLjDU25ynmkN",
  },
];

export const containerVariannts = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity:1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    }
  }
}