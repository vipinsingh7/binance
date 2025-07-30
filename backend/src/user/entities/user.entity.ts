import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Role } from '../Role';



@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  age: number;
  @Column({ nullable: true })
  tel: string;
  @Column({ nullable: true })
  adresse: string;
  @Column()
  role:Role
  @Column({ nullable: true })

  @Column({ default: false })
  isEmailVerified: boolean;

}
