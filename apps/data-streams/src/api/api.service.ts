import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(@Inject('WORKER_SERVICE') private readonly client: ClientProxy) {}

  startWorker(): Observable<string> {
    return this.client.send<string>({ cmd: 'start-worker' }, {});
  }

  stopWorker(): Observable<string> {
    return this.client.send<string>({ cmd: 'stop-worker' }, {});
  }
}
