import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { Application } from './application.entity';

@Entity()
export class JobPosting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  position: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  stack: string;

  @Column()
  reward: number;

  @Column({ name: 'company_id', type: 'int' })
  companyId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Company, (company) => company.jobPostings)
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @OneToMany(() => Application, (application) => application.jobPosting)
  applications?: Application[];
}
