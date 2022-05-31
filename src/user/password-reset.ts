import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PassworReset {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    nullable: false,
  })
  user_id: number;
  @Column({
    nullable: false,
  })
  hash: string;
  @Column({
    nullable: false,
  })
  expires_at: Date;

  @OneToMany((type) => User, (user) => user.passwordResets)
  user: User;
}
