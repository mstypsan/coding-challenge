import { Injectable } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { DataService } from './data-service/data.service';

@Injectable()
export class WorkerService {
  private readonly cronJobName: string = 'api_caller';

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly dataService: DataService,
  ) {}

  start(): boolean {
    this.createCronJob();
    return true;
  }

  stop(): boolean {
    const cronJobExists = this.schedulerRegistry.doesExist(
      'cron',
      this.cronJobName,
    );

    if (!cronJobExists) {
      return true;
    }

    const cronJob = this.schedulerRegistry.getCronJob(this.cronJobName);
    cronJob.stop();
    return true;
  }

  private createCronJob() {
    const cronJobExists = this.schedulerRegistry.doesExist(
      'cron',
      this.cronJobName,
    );

    let cronJob: CronJob;
    if (!cronJobExists) {
      cronJob = new CronJob(CronExpression.EVERY_5_MINUTES, () => {
        this.dataService.processData();
      });
      this.schedulerRegistry.addCronJob(this.cronJobName, cronJob);
    } else {
      cronJob = this.schedulerRegistry.getCronJob(this.cronJobName);
    }

    cronJob.start();
  }
}
