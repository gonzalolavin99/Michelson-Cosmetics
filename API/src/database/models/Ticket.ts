import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  pass: string;
  @Column()
  idPurchase: number;
}
