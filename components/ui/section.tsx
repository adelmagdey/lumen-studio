import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article" | "main";
  container?: boolean;
  spacing?: "sm" | "md" | "lg" | "xl";
  id?: string;
}

const spacingMap = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-28",
  xl: "py-24 sm:py-36",
};

export function Section({
  className,
  as: Tag = "section",
  container = true,
  spacing = "lg",
  id,
  children,
  ...props
}: SectionProps) {
  const Comp = Tag as React.ElementType;
  return (
    <Comp id={id} className={cn("relative", spacingMap[spacing], className)} {...props}>
      {container ? (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      ) : (
        children
      )}
    </Comp>
  );
}
