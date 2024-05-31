import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CatFact {
  public constructor(fact: string, length: number) {
    this.fact = fact;
    this.length = length;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fact: string;

  @Column()
  length: number;
}
