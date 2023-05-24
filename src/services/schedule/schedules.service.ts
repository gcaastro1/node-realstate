import { AppDataSource } from '../../data-source'
import { RealEstate, Schedule, User } from '../../entities'
import AppError from '../../errors'
import 'dotenv/config'
import { Repository } from 'typeorm'
import { iScheduleCreate } from '../../interfaces'

const create = async (payload: iScheduleCreate, userId: number) => {
  const scheduleRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule)
  const userRepo: Repository<User> = AppDataSource.getRepository(User)
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate)

  const user: User | null = await userRepo.findOneBy({
    id: userId,
  })

  const realEstate: RealEstate | null = await realEstateRepo.findOneBy({
    id: payload.realEstateId,
  })

  if (!realEstate) throw new AppError('RealEstate not found', 404)

  const { date, hour, realEstateId } = payload

  const dateValues = date.split('/')

  const newDate = `${dateValues[0]}/${dateValues[2]}/${dateValues[1]}`

  const validatedDate = new Date(newDate).getDay()

  if (validatedDate === 0 || validatedDate === 6)
    throw new AppError('Invalid date, work days are monday to friday')

  const splitedHour = hour.split(':')

  const validateHour = Number(splitedHour[0])

  if (validateHour > 18 || validateHour < 8)
    throw new AppError('Invalid hour, available times are 8AM to 18PM')

  const ensureScheduleNotExists: Schedule | null = await scheduleRepo
    .createQueryBuilder('schedule')
    .where('schedule.realEstateId = :realEstateId', {
      realEstateId: realEstateId,
    })
    .andWhere('schedule.hour = :hour', { hour: hour })
    .andWhere('schedule.date = :date', { date: date })
    .getOne()

  if (ensureScheduleNotExists)
    throw new AppError(
      'Schedule to this real estate at this date and time already exists',
      409
    )

  const ensureUserScheduleNotExists = await scheduleRepo
    .createQueryBuilder('schedule')
    .where('schedule.userId = :userId', { userId: userId })
    .andWhere('schedule.hour = :hour', { hour: hour })
    .andWhere('schedule.date = :date', { date: date })
    .getOne()

  if (ensureUserScheduleNotExists)
    throw new AppError(
      'User schedule to this real estate at this date and time already exists',
      409
    )

  const data = {
    date: newDate,
    user: user!,
    realEstate: realEstate,
    hour: payload.hour,
  }

  const schedule = scheduleRepo.create(data)

  await scheduleRepo.save(schedule)

  return { message: 'Schedule created' }
}

const read = async (realEstateId: number) => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate)

  const realEstate: RealEstate | null = await realEstateRepo.findOneBy({
    id: realEstateId,
  })

  if (!realEstate) throw new AppError('RealEstate not found', 404)

  const scheduledRealEstate: RealEstate | null = await realEstateRepo.findOne({
    where: {
      id: realEstateId,
    },
    relations: {
      address: true,
      category: true,
      schedules: {
        user: true,
      },
    },
  })

  return scheduledRealEstate
}

export default { create, read }
