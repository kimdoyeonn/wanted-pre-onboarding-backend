import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async getOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }
}
