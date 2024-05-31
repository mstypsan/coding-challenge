import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { ClientProxyModule } from './client-proxy/client-proxy.module';
import { DataService } from './data-service/data.service';

@Module({
  imports: [
    ClientProxyModule,
    ScheduleModule.forRoot(),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [WorkerController],
  providers: [WorkerService, DataService],
})
export class WorkerModule {}
