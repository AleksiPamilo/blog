"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onEnter?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onEnter, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-lg border px-3 py-2 bg-zinc-100 border-zinc-200 focus:border-zinc-400 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
          className
        )}
        ref={ref}
        onKeyDown={(key) => {
          if (key.code === "Enter" && onEnter) {
            onEnter();
          }
        }}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
