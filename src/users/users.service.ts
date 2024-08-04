import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async getOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
}
