import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Person {
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
