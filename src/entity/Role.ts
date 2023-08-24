import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    roleName: string

}
