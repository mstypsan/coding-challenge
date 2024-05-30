import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WorkerModule,
    {
      options: {
        port: 3001,
      },
      transport: Transport.TCP,
    },
  );
  app.listen();
}
bootstrap();
