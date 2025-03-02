import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        custom: "bg-blue-700 text-white hover:bg-blue-700/90",
        custom_btnbf: "bg-white border-2 border-[#e8e8e8] hover:bg-blue-700/90 text-black hover:text-white transition-transform duration-300 hover:scale-105",
        // secondary_btn: "bg-blue-700 hover:bg-secondarybackground dark:hover:bg-secondarybackground text-white",
        secondary_btn: "bg-blue-700 hover:bg-secondarybackground dark:hover:bg-secondarybackground text-white",
        arrows_btn: "bg-transparent text-white [&_svg]:size-auto dark:text-black"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        large: "h-14 w-full rounded-none",
        btnsearch: "h-14 w-14 rounded-none",
        btnbf: "h-14 w-full rounded-md",
        basketbtn: "size-7",
        primarybtn: "h-12 p-6 rounded-md",
        arrowsbtn: "w-12 h-12",
        custom_sm: "h-12 w-28 p-6 rounded-md"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
