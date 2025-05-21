import { plans } from "@/app/constants";
import { getPriceid } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { Badge } from "../ui/badge";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const PlanBagde = async () => {
  const user = await currentUser();
  if (!user?.id) {
    return null;
  }

  const email = user?.emailAddresses[0]?.emailAddress;

  let priceId: string | null = null;

  if (email) {
    priceId = await getPriceid(email);
  }
  let planName = "Buy a plan";
  const plan = plans.find((plan) => plan.priceId === priceId);
  if (plan) {
    planName = plan.name;
  }
  return(
    <Badge variant={"outline"}
     className={cn("ml-2 bg-accent text-accent-foreground",
        priceId ? 'text-amber-600' : 'text-red-600')}
    >
        <Crown className={cn('w-3 h-3 mr-1 text-amber-600',
            !priceId && 'text-red-600'
        )}/>
        {planName}
    </Badge>
  );
};

export default PlanBagde;
