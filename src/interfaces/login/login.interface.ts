import { z } from 'zod'
import { createLoginSchema } from '../../schemas'

export type iLoginRequest = z.infer<typeof createLoginSchema>
