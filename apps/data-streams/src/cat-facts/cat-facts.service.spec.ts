import { Test, TestingModule } from '@nestjs/testing';
import { CatFactService } from './cat-facts.service';

describe('CatFactService', () => {
  let service: CatFactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatFactService],
    }).compile();

    service = module.get<CatFactService>(CatFactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
