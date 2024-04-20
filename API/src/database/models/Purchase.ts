import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  rut: string;
  @Column()
  idtransaction: number;
  @Column()
  date: Date;
}
