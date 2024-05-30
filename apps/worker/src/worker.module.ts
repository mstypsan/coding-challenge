import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientProxyModule } from './client-proxy/client-proxy.module';

@Module({
  imports: [
    ClientProxyModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
