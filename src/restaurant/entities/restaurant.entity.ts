import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export interface SimpleRestaurant {
  id: number;
  name: string;
  typeFood: string;
  logoPhoto: string;
  backgroudPhoto: string;
}

@Entity()
export class Restaurant implements SimpleRestaurant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column("varchar", {length: 60, nullable: false})
  name: string;

  @Column("varchar", {length: 100, nullable: false})
  typeFood: string;

  @Column("varchar", {nullable: false})
  logoPhoto: string;

  @Column("varchar", {nullable: false})
  backgroudPhoto: string;

  @Column()
  phone: string;

  @Column()
  locale: string;

  @Column({ type: "double precision", default: 3.5})
  review: number;

  @ManyToMany(() => Product, { cascade: true})
  @JoinTable()
  foodProducts: Product[];

  @ManyToMany(() => Product, { cascade: true})
  @JoinTable()
  drinkProducts: Product[];
}
