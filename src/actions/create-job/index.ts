'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'

import { InputType, ReturnType } from './types'
import { CreateJob } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  // Authorization check when we have
  // const { userId} = auth();

  // if (!userId ) {
  //   return {
  //     error: "Unauthorized",
  //   };
  // }

  const { title } = data

  let job

  try {
    job = await db.job.create({
      data: {
        title,
      },
    })
  } catch (error) {
    return {
      error: 'Failed to create.',
    }
  }

  revalidatePath(`/job/${job.id}`)
  return { data: job }
}

export const createJob = createSafeAction(CreateJob, handler)
