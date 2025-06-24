import * as React from "react";
function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
          variant === "default"
            ? "bg-[#1f5b07] text-white border-transparent"
            : "bg-transparent text-[#1f5b07] border-[#1f5b07]",
         
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
