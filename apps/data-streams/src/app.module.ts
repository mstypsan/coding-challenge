import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { ClientProxyModule } from './client-proxy/client-proxy.module';
import { CatFactModule } from './cat-facts/cat-facts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatFact } from './cat-facts/catFact.entity';
import { ApiService } from './api/api.service';

@Module({
  imports: [
    ClientProxyModule,
    CatFactModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [CatFact],
      synchronize: true,
    }),
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class AppModule {}
