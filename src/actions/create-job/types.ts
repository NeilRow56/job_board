import { z } from 'zod'
import { Job } from '@prisma/client'

import { ActionState } from '@/lib/create-safe-action'

import { CreateJob } from './schema'

export type InputType = z.infer<typeof CreateJob>
export type ReturnType = ActionState<InputType, Job>
