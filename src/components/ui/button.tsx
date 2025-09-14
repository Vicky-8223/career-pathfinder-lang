import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-white shadow-button hover:shadow-glow hover:scale-105 transition-all duration-300",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl transition-all duration-300",
        outline: "border-2 border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/40 hover:shadow-glow transition-all duration-300",
        secondary: "bg-gradient-secondary text-white shadow-button hover:shadow-glow-secondary hover:scale-105 transition-all duration-300",
        ghost: "hover:bg-accent/50 hover:backdrop-blur-sm transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-colors duration-300",
        accent: "bg-gradient-accent text-white shadow-button hover:shadow-lg hover:scale-105 transition-all duration-300",
        success: "bg-gradient-success text-white shadow-button hover:shadow-lg hover:scale-105 transition-all duration-300",
        rainbow: "bg-gradient-rainbow text-white shadow-button hover:shadow-glow hover:scale-110 transition-all duration-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
