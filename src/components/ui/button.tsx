import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-[#c4141c] font-bold",
        secondary: "bg-accent text-white hover:bg-ink font-bold",
        ghost: "text-ink hover:bg-surface-soft font-bold",
        outline: "border-2 border-white bg-transparent text-white hover:bg-white/15 font-bold",
      },
      size: {
        default: "h-12 px-6 rounded-[var(--radius-md)] text-base",
        sm: "h-10 px-4 rounded-[var(--radius-sm)] text-sm",
        lg: "h-14 px-8 rounded-[var(--radius-md)] text-lg",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
