import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Unique,
} from "typeorm";

export enum Status {
  ENABLE = "enable",
  DISABLE = "disable",
  INVITE = "invite"
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export const UNIQUE_USER_EMAIL_CONSTRAINT = "unique_user_email_constraint";

@Entity()
@Unique(UNIQUE_USER_EMAIL_CONSTRAINT, ["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstname: string;

  @Column({ nullable: true })
  middlename: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: "text",
    enum: Gender,
  })
  gender: Gender;

  @Column({ nullable: true })
  loggedIn: boolean;

  @Column()
  password: string;

  @Column({
    type: "text",
    enum: Role,
  })
  role: Role;

  @Column({
    type: "text",
    enum: Status,
  })
  status: Status;

  // @OneToOne(() => Role)
  // @JoinColumn()
  // role: Role;

  // @OneToOne(() => Status)
  // @JoinColumn()
  // status: Status;
}
