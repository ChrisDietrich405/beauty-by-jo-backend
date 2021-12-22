import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class SpecificService {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  status: boolean;

  @ManyToOne((type) => Service)
  @JoinColumn({ name: 'service_id' })
  service: Service;
}
