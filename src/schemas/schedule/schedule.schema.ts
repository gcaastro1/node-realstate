import { z } from 'zod'

const dateRegex = /^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}$/
const hourRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/

export const scheduleSchema = z.object({
  id: z.number(),
  date: z.string().regex(dateRegex, 'Date must be YYYY/DD/MM'),
  hour: z.string().regex(hourRegex, 'Hour must be HH:MM'),
})

export const createScheduleSchema = scheduleSchema
  .omit({
    id: true,
  })
  .extend({
    realEstateId: z.number(),
  })
