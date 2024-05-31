import { Test, TestingModule } from '@nestjs/testing';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

describe('WorkerController', () => {
  let workerController: WorkerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WorkerController],
      providers: [{ provide: WorkerService, useValue: {} }],
    }).compile();

    workerController = app.get<WorkerController>(WorkerController);
  });

  it('should be defined', () => {
    expect(workerController).toBeDefined();
  });
});
