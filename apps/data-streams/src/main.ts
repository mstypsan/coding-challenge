import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

const initMicroservice = async (app: INestApplication) => {
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'streams_queue',
      noAck: false,
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservices();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await initMicroservice(app);
  await app.listen(9000);
}
bootstrap();
