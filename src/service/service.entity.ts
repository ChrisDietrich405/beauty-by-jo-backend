import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SpecificService } from './specific-service.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  status: boolean;
  @Column()
  name: string;
  @Column()
  path: string;
  @OneToMany(
    (type) => SpecificService,
    (specificService) => specificService.service,
  )
  specificService: SpecificService[];
}
