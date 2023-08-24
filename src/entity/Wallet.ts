import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  walletNumber: string;

  @Column()
  walletBalance: number;

  @Column()
  userId: number;
}
