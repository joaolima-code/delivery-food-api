import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column("varchar", {length: 60, nullable: false})
  name: String;

  @Column("varchar", {length: 150, nullable: false})
  description: String;

  @Column({type: "double precision"})
  price: number;

  @Column("varchar", {nullable: false})
  photo: String;
}
