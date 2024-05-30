import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CatFactService } from './cat-facts.service';
import { CatFact } from './catFact.entity';
import { CatFactDto } from './catFactDto';
import { CatFactsResponse } from './catFactsResponse';
import { CatData } from '@app/shared';

@Controller('cat-facts')
export class CatFactsController {
  constructor(private readonly catFactService: CatFactService) {}

  @EventPattern('cat_data_received')
  async handleDataReceived(
    @Payload() data: CatData,
    @Ctx() context: RmqContext,
  ) {
    // Consider idempotency
    const catFact = new CatFact(data.fact, data.length);
    await this.catFactService.save(catFact);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
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
