'use client'

import { ElementRef, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Job } from '@prisma/client'
import { FormInput } from '@/components/form/form-input'
import { updateJob } from '@/actions/update-job'
import { useAction } from '@/hooks/use-action'
import { toast } from 'sonner'

type JobTitleFormProps = {
  data: Job
}

const JobTitleForm = ({ data }: JobTitleFormProps) => {
  const { execute } = useAction(updateJob, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated!`)
      setTitle(data.title)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [title, setTitle] = useState(data.title)
  const [isEditing, setIsEditing] = useState(false)

  const enableEditing = () => {
    setIsEditing(true)

    //Focus Inputs
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    execute({
      title,
      id: data.id,
    })
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="h-7 border-none bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent"
        />
      </form>
    )
  }

  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="h-auto w-auto p-1 px-2 text-lg font-bold text-blue-800"
    >
      {title}
    </Button>
  )
}

export default JobTitleForm
