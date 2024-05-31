import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatFact } from './catFact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatFactService {
  constructor(
    @InjectRepository(CatFact)
    private catFactRepository: Repository<CatFact>,
  ) {}

  async save(catFact: CatFact): Promise<CatFact> {
    return await this.catFactRepository.save(catFact);
  }

  async findAll(): Promise<CatFact[]> {
    // TODO set up paging
    return await this.catFactRepository.find();
  }
}
