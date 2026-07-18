import * as React from "react";
import { cn } from "@/lib/utils";

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    if (!React.isValidElement(children)) {
      return null;
    }
    return React.cloneElement(children, {
      ...(props as Record<string, unknown>),
      ref,
      className: cn(
        (props.className as string | undefined) ?? "",
        (children.props as { className?: string }).className ?? ""
      ),
    } as Record<string, unknown>);
  }
);
Slot.displayName = "Slot";
