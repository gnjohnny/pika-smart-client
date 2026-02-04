import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Stars, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  title?: string;
  desc?: string;
  link?: string;
  Icon?: LucideIcon;
  buttonText?: string;
};

export const EmptyState = ({
  title,
  desc,
  link,
  Icon,
  buttonText,
}: EmptyStateProps) => {
  return (
    <Empty className="bg-muted/30 h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UtensilsCrossed />
        </EmptyMedia>
        <EmptyTitle>{title || "No Recipes Found"}</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          {desc ||
            "No recipes found. Click the button below to start generating now."}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to={link || "/dashboard/create"}>
          <Button variant="outline" className="cursor-pointer">
            {Icon ? <Icon /> : <Stars />}
            {buttonText || "Generate Recipe"}
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
};
