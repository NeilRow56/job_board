'use client'

import { ElementRef, useRef } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover'

import { FormInput } from './form-input'
import { FormSubmit } from './form-submit'

import { X } from 'lucide-react'

import { useRouter } from 'next/navigation'

import { useAction } from '@/hooks/use-action'
import { createJob } from '@/actions/create-job'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

interface FormPopoverProps {
  children: React.ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

export const FormPopover = ({
  children,
  side = 'bottom',
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const router = useRouter()
  const closeRef = useRef<ElementRef<'button'>>(null)
  const { execute, fieldErrors } = useAction(createJob, {
    onSuccess: (data) => {
      toast.success('Todo created!')
      closeRef.current?.click()
      router.push(`/todo/${data.id}`)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string

    execute({ title })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="pb-4 text-center text-sm font-medium text-slate-900">
          Create Todo
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-slate-400"
            variant="ghost"
          >
            <X className="h-4 w-4 text-slate-900" />
          </Button>
        </PopoverClose>

        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormInput
              id="title"
              label="Todo title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full text-slate-100">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
