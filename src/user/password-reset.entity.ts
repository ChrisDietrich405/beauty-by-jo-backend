import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PasswordReset {
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

  @OneToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
