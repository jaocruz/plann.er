import { ComponentProps, ReactNode } from "react"
import { tv, VariantProps } from "tailwind-variants"

const inputVariants = tv({
  base: "flex items-center px-4",

  variants: {
    variant: {
      primary: "h-16 bg-zinc-900 rounded-xl shadow-shape gap-4",
      secondary: "h-14 bg-zinc-950 border-zinc-800 rounded-lg gap-2"
    },

    defaultVariants: {
      variant: "primary"
    },
  }
})

interface InputProps extends ComponentProps<'input'>, VariantProps<typeof inputVariants>{
  children: ReactNode
}

export function Input({ children, variant, ...props } : InputProps){
  return(
    <div {...props} className={inputVariants({ variant })}>
      {children}
    </div>
  )
}