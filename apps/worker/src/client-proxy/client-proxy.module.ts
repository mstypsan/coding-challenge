import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STREAMS_SERVICE',
        options: {
          port: 3002,
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class ClientProxyModule {}
