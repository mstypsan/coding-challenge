import { Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly appService: ApiService) {}

  @Post('start')
  start(): Observable<string> {
    return this.appService.startWorker();
  }

  @Post('stop')
  stop(): Observable<string> {
    return this.appService.stopWorker();
  }
}
