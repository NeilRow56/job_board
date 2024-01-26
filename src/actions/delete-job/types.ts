import { z } from 'zod'
import { Job } from '@prisma/client'

import { ActionState } from '@/lib/create-safe-action'

import { DeleteJob } from './schema'

export type InputType = z.infer<typeof DeleteJob>
export type ReturnType = ActionState<InputType, Job>
