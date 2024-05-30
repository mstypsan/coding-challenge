import { Module } from '@nestjs/common';
import { CatFactService } from './cat-facts.service';
import { CatFactsController } from './cat-facts.controller';
import { CatFact } from './catFact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CatFact])],
  providers: [CatFactService],
  controllers: [CatFactsController],
})
export class CatFactModule {}
