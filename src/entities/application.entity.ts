import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobPosting } from './job-posting.entity';
import { User } from './user.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ name: 'job_posting_id', type: 'int' })
  jobPostingId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.application, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => JobPosting, (jobPosting) => jobPosting.applications, {
    cascade: true,
  })
  @JoinColumn({ name: 'job_posting_id' })
  jobPosting: JobPosting;
}
