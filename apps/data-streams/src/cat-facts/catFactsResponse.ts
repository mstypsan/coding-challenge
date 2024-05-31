import { CatFactDto } from './catFactDto';

export class CatFactsResponse {
  public constructor(catFacts: CatFactDto[]) {
    this.count = catFacts.length;
    this.catFacts = catFacts;
  }

  readonly count: number;

  readonly catFacts: CatFactDto[];
}
