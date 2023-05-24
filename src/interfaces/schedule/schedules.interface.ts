import { Repository } from 'typeorm'
import { z } from 'zod'
import { Schedule } from '../../entities'
import { scheduleSchema, createScheduleSchema } from '../../schemas'

export type iSchedule = z.infer<typeof scheduleSchema>
export type iScheduleCreate = z.infer<typeof createScheduleSchema>
export type iScheduleRepo = Repository<Schedule>
