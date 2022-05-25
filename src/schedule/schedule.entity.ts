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
    nullable: false,
  })
  date: Date;

  @Column({
    type: 'int',
    nullable: false,
  })
  specific_service_id;

  @Column({
    type: 'int',
    nullable: false,
  })
  user_id;

  @OneToOne(() => SpecificService)
  specificService: SpecificService;
}
