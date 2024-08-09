"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/auth/Header";
import { ActionButton } from "./ActionButton";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  actionLabel: string;
  actionHref: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  actionLabel,
  actionHref,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel}/>
      </CardHeader>
      

      <CardContent>
        {children}
      </CardContent>

      <CardFooter>
         <ActionButton href={actionHref} label={actionLabel}  />
      </CardFooter>
    </Card>
  );
};
