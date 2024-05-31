import { Controller } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @MessagePattern({ cmd: 'start-worker' })
  async startWorker(): Promise<string> {
    await this.workerService.start();
    return 'Worker has started';
  }

  @MessagePattern({ cmd: 'stop-worker' })
  async stopWorker(): Promise<string> {
    await this.workerService.stop();
    return 'Worker has stopped';
  }
}
