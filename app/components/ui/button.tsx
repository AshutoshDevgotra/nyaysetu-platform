import * as React from "react";
function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
      default: "bg-[#1f5b07] text-white hover:bg-[#1f5b07]/90",
      outline: "border border-[#e8c288] text-[#e8c288] hover:bg-[#e8c288]/10",
      ghost: "bg-transparent hover:bg-[#1f5b07]/10 text-[#1f5b07]",
    };
    

    const sizes = {
      default: "h-10 px-4 py-2",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
