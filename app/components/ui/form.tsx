"use client"

import * as React from "react"
import { useFormContext, Controller, FormProvider } from "react-hook-form"
import { Slot } from "@radix-ui/react-slot"

type FormProps = {
  children: React.ReactNode
} & React.FormHTMLAttributes<HTMLFormElement>

function Form({ children, ...props }: FormProps) {
  const methods = useFormContext()
  return (
    <form {...props}>
      <FormProvider {...methods}>{children}</FormProvider>
    </form>
  )
}

function FormField({ name, render }: any) {
  const { control } = useFormContext()
  return <Controller name={name} control={control} render={render} />
}

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className="space-y-2" {...props} />
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  return <Slot ref={ref} {...props} />
})
FormControl.displayName = "FormControl"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className="text-[0.8rem] font-medium text-destructive"
      {...props}
    />
  )
})
FormMessage.displayName = "FormMessage"

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
}
