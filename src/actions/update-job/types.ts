import { z } from 'zod'
import { Job } from '@prisma/client'

import { ActionState } from '@/lib/create-safe-action'

import { UpdateJob } from './schema'

export type InputType = z.infer<typeof UpdateJob>
export type ReturnType = ActionState<InputType, Job>
