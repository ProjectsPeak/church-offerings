
import { CardWrapper } from "./CardWrapper";
import { TriangleAlert } from "lucide-react";

export default function ErrorCard() {
  return (
    <CardWrapper headerLabel="Oops! Something went wrong!" actionHref="/auth/login" actionLabel="Back to Login">
        <div className="w-full flex justify-center items-center">
          <TriangleAlert className="text-destructive"/>
        </div>
    </CardWrapper>
  )
}