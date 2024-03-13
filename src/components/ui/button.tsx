import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl font-bold disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-button-solid text-primary shadow-button-solid",
        ghost:
          "bg-button-glass text-white shadow-button-glass backdrop-blur-sm ring-[1.5px] ring-white ring-opacity-30",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-6 text-sm",
        lg: "h-14 px-8 rounded-3xl text-xl",
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

export default React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { asChild, variant, size, className, children, ...props },
  ref,
) {
  const classes = cn(buttonVariants({ variant, size }), className);

  const Component = asChild ? "span" : "button";

  return (
    <Component ref={ref} className={classes} {...props}>
      {children}
    </Component>
  );
});
