import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CatFactService } from './cat-facts.service';
import { CatFact } from './catFact.entity';
import { CatFactDto } from './catFactDto';
import { CatFactsResponse } from './catFactsResponse';
import { CatData } from '@app/shared';

@Controller('cat-facts')
export class CatFactsController {
  constructor(private readonly catFactService: CatFactService) {}

  @EventPattern('cat_data_received')
  async handleDataReceived(data: CatData) {
    const catFact = new CatFact(data.fact, data.length);
    await this.catFactService.save(catFact);
  }

  @Get()
  async getAll(): Promise<CatFactsResponse> {
    var catFacts = await this.catFactService.findAll();
    var catFactsDto = catFacts.map(
      (catFact) => new CatFactDto(catFact.fact, catFact.length),
    );

    return new CatFactsResponse(catFactsDto);
  }
}
