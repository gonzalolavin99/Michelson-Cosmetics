import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Adress extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  region: string;
  @Column()
  street: string;
  @Column()
  commune: string;
  @Column()
  houseNumber: number;
  @Column()
  detail: string;
  @Column()
  rutPerson: string;
}
