import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LOG {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  hex: string;

  @Column('text')
  type: string;

  @Column('text')
  sender: string;

  @Column('text')
  receiver: string;

  @Column('text')
  amount: string;

  @Column('text')
  status: string;
}
