import * as React from "react";

// Since you don't have a `utils` file in `lib`, you can define the `cn` function directly in this file or create a new utility file for it. 
// Here's the implementation of the `cn` function directly in this file:

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-white text-black shadow-sm",)}
    {...props}
  />
));
Card.displayName = "Card";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0",)} {...props} />
));
CardContent.displayName = "CardContent";

export { Card, CardContent };
