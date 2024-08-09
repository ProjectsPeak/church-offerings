"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ActionButtonProps {
  label: string;
  href: string;
}
export const ActionButton = ({ label, href }: ActionButtonProps) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
