import { Test, TestingModule } from '@nestjs/testing';
import { CatFactsController } from './cat-facts.controller';

describe('CatFactController', () => {
  let controller: CatFactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatFactsController],
    }).compile();

    controller = module.get<CatFactsController>(CatFactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
