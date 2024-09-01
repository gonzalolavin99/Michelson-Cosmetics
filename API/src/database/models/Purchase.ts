import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  rutPerson: string;
  @Column()
  idtransaction: string;
  @Column()
  amount: number;
  @Column()
  date: Date;
  @Column()
  state: 'PENDING' | 'CANCEL' | 'DONE' ;
}
