import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PassworReset } from './password-reset';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;

  @OneToMany((type) => PassworReset, (passwordReset) => passwordReset.user)
  passwordResets: PassworReset[];
}
