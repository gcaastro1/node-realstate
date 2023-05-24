import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { Address, Category, Schedule } from './index'

@Entity('real_estate')
class RealEstate {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'boolean', default: false })
  sold: boolean

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  value: number | string

  @Column({ type: 'integer' })
  size: number

  @CreateDateColumn({ type: 'date' })
  createdAt: string

  @UpdateDateColumn({ type: 'date' })
  updatedAt: string

  @ManyToOne(() => Category)
  category: Category

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address

  @OneToMany(() => Schedule, (schedule) => schedule.realEstate)
  schedules: Schedule[]
}

export default RealEstate
