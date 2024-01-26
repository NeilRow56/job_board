'use server'

import { InputType, ReturnType } from './types'
import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'
import { UpdateJob } from './schema'
import { revalidatePath } from 'next/cache'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { title, id } = data

  let job

  try {
    job = await db.job.update({
      where: {
        id,
      },
      data: {
        title,
      },
    })
  } catch (error) {
    return {
      error: 'Failed to update.',
    }
  }
  revalidatePath(`/job/${id}`)
  return { data: job }
}

export const updateJob = createSafeAction(UpdateJob, handler)
