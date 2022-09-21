import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LOG } from './blockchain.entity';

@Injectable()
export class LOGService {
  constructor(
    @Inject('LOG_REPOSITORY')
    private LOGRepository: Repository<LOG>,
  ) {}

  async findAll(): Promise<LOG[]> {
    return this.LOGRepository.find();
  }
}