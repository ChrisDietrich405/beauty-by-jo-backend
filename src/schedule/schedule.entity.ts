import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { SpecificService } from '../service/specific-service.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  status: boolean;

  @Column({
    type: 'date',
    nullable: false,
  })
  date: string;

  @OneToOne(() => SpecificService)
  specificService: SpecificService;
}
