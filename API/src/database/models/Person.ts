import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  rut: string;
  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  mail: string;
}
