import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { ClientProxyModule } from './client-proxy/client-proxy.module';
import { ApiService } from './api/api.service';

@Module({
  imports: [
    ClientProxyModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class AppModule {}
