import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { CatData } from '@app/shared';
import { AxiosResponse } from 'axios';

describe('DataServiceService', () => {
  let service: DataService;

  const httpMockService = {
    get: jest.fn(),
  };

  const streamsMockService = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataService,
        {
          provide: HttpService,
          useValue: httpMockService,
        },
        {
          provide: 'STREAMS_SERVICE',
          useValue: streamsMockService,
        },
      ],
    }).compile();

    service = module.get<DataService>(DataService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should emit "cat_data_received" with CatData', async () => {
    const catData: CatData = { fact: 'a fact', length: 10 };
    const axiosResponse: AxiosResponse<CatData> = {
      data: catData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined,
      },
    };

    httpMockService.get.mockReturnValue(of(axiosResponse));

    await service.processData();

    expect(streamsMockService.emit).toHaveBeenCalledWith(
      'cat_data_received',
      catData,
    );
  });

  it('should not emit data when getData returns undefined', async () => {
    httpMockService.get.mockReturnValue(of(undefined));

    await service.processData();

    expect(streamsMockService.emit).not.toHaveBeenCalled();
  });

  it('should not emit data when fetching data fails', async () => {
    httpMockService.get.mockReturnValue(throwError(() => new Error()));

    await service.processData();

    expect(streamsMockService.emit).not.toHaveBeenCalled();
  });
});
