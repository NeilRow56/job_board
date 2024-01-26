'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'

import { DeleteJob } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id } = data
  let job

  try {
    job = await db.job.delete({
      where: {
        id,
      },
    })
  } catch (error) {
    return {
      error: 'Failed to delete.',
    }
  }

  revalidatePath('/job')
  redirect('/job')
}

export const deleteJob = createSafeAction(DeleteJob, handler)
