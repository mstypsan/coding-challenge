import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom, of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CatData } from '@app/shared';

@Injectable()
export class DataService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('STREAMS_SERVICE') private readonly client: ClientProxy,
  ) {}

  async processData(): Promise<void> {
    const catData = await this.getData();
    if (!catData) {
      return;
    }
    this.client.emit('cat_data_received', catData);
  }

  private async getData(): Promise<CatData | undefined> {
    const response = await firstValueFrom<AxiosResponse<CatData>>(
      this.httpService.get('https://catfact.ninja/fact').pipe(
        catchError((error: AxiosError, caught: Observable<any>) => {
          //log error
          //implement exponential backoff
          return of(undefined);
        }),
      ),
    );
    return response?.data;
  }
}
