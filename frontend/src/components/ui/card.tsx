import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { hoverEffect?: boolean }
>(({ className, hoverEffect, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm glass relative overflow-hidden",
      hoverEffect &&
        "hover:border-primary/50 transition-colors duration-300 group",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

export { Card };
