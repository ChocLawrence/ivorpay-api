import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  TRANSFER = "transfer"
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  debitedWallet: string;

  @Column({ nullable: true })
  creditedWallet: string;

  @Column()
  amount: string;

  @Column({
    type: "text",
    enum: TransactionType,
  })
  transactionType: TransactionType;

}
