import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Status {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    statusName: string

}
