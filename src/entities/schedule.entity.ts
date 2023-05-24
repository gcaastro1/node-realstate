import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { RealEstate, User } from './index'

@Entity('schedules_users_properties')
class Schedule {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'date' })
  date: string

  @Column({ type: 'time' })
  hour: string

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => RealEstate, (realEstate) => realEstate.schedules)
  realEstate: RealEstate
}

export default Schedule
