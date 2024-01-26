import { z } from 'zod'

export const DeleteJob = z.object({
  id: z.string(),
})
