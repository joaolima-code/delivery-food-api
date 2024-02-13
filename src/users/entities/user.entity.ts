import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column("varchar", {length: 60, nullable: false})
    name: string

    @Column("varchar", {length: 200, nullable: false})
    email: string

    @Column("varchar", {length: 300, nullable: false})
    password: string
}
