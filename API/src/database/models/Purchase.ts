import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  rut: string;
  @Column()
  idtransaction: number;
  @Column()
  date: Date;
}
