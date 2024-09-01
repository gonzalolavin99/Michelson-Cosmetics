import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Person extends BaseEntity {
  @PrimaryColumn()
  rut: string;
  @Column()
  name: string;
  @Column()
  phone: string;
  @Column()
  email: string;
  
}
