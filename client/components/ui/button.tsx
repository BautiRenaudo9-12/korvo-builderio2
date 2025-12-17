import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[hsl(var(--button-default-bg))] text-[hsl(var(--button-default-text))] hover:bg-[hsl(var(--button-default-hover))]",
        destructive:
          "bg-[hsl(var(--button-destructive-bg))] text-[hsl(var(--button-destructive-text))] hover:bg-[hsl(var(--button-destructive-hover))]",
        outline:
          "border border-[hsl(var(--button-outline-border))] bg-[hsl(var(--button-outline-bg))] text-[hsl(var(--button-outline-text))] hover:bg-[hsl(var(--button-outline-hover-bg))] hover:text-[hsl(var(--button-outline-hover-text))]",
        secondary:
          "bg-[hsl(var(--button-secondary-bg))] text-[hsl(var(--button-secondary-text))] hover:bg-[hsl(var(--button-secondary-hover))]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
