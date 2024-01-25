'use client'

import React from 'react'
import { FormInput } from '../form/form-input'
import { FormSubmit } from '../form/form-submit'
import { useRouter } from 'next/navigation'

import { useAction } from '@/hooks/use-action'
import { createJob } from '@/actions/create-job'
import { toast } from 'sonner'

type Props = {}

const JobForm = (props: Props) => {
  const router = useRouter()
  const { execute, fieldErrors } = useAction(createJob, {
    onSuccess: (data) => {
      toast.success('Job created!')

      router.push('job')
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
    <div className="container mx-auto flex w-[600px] flex-col items-center justify-center rounded-md border border-slate-400 p-4">
      <h2 className="text-xl font-bold">New Job Form</h2>
      <form action={onSubmit} className="my-4 space-y-4">
        <div className="space-y-4">
          <FormInput
            id="title"
            label="Job title"
            type="text"
            errors={fieldErrors}
          />
        </div>
        <FormSubmit className="w-full text-slate-100">Create</FormSubmit>
      </form>
    </div>
  )
}

export default JobForm
