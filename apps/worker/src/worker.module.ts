import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { ClientProxyModule } from './client-proxy/client-proxy.module';

@Module({
  imports: [
    ClientProxyModule,
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
